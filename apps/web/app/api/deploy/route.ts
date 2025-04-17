import { type NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const VERCEL_API_URL = "https://api.vercel.com";
const token = process.env.VERCEL_ACCESS_TOKEN;
const teamId = process.env.VERCEL_TEAM_ID;

if (!token) {
  throw new Error("VERCEL_ACCESS_TOKEN is required");
}

if (!teamId) {
  throw new Error("VERCEL_TEAM_ID is required");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert File to Buffer and calculate SHA
    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    const fileSha = crypto.createHash("sha1").update(fileBuffer).digest("hex");

    // Upload the file to Vercel
    const uploadResponse = await fetch(
      `${VERCEL_API_URL}/v2/files?teamId=${teamId}`,
      {
        method: "POST",
        body: file,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
          "x-vercel-digest": fileSha,
        },
      }
    );

    if (!uploadResponse.ok) {
      console.error('Upload failed:', await uploadResponse.text());
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Create the deployment
    const deploymentResponse = await fetch(
      `${VERCEL_API_URL}/v12/now/deployments?teamId=${teamId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: [
            {
              file: ".vercel/source.tgz",
              sha: fileSha,
            },
          ],
          projectSettings: {
            framework: "nextjs",
            buildCommand: "pnpm build",
            installCommand: "pnpm install",
            outputDirectory: ".next",
            nodeVersion: "20.x",
          },
          name: `workflow-${generateRandomId(8)}`,
          env: {
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,
          },
        }),
      }
    );

    if (!deploymentResponse.ok) {
      console.error('Deployment failed:', await deploymentResponse.text());
      return NextResponse.json(
        { error: "Failed to create deployment" },
        { status: 500 }
      );
    }

    const deployment = await deploymentResponse.json();

    return NextResponse.json({ deployment }, { status: 200 });
  } catch (error) {
    console.error("Deployment error:", error);
    return NextResponse.json(
      { error: "Failed to create deployment" },
      { status: 500 }
    );
  }
}

function generateRandomId(length: number) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }
  return randomId;
}