import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function saveFile(file: File): Promise<string> {

    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    return fileName;
}

async function deleteFile(fileName: string) {

    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    try {

        await fs.unlink(filePath);

    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: Request) {

    try {

        const formData = await req.formData();
        const data: any = {};
        let resumeUrl: string | null = null;

        for (const [key, value] of formData.entries()) {

            if (key === "resumeUrl" && value instanceof File) {
                resumeUrl = await saveFile(value);
            } else {
                data[key] = value;
            }
        }

        if (resumeUrl) {
            data.resumeUrl = resumeUrl;
        }

        const existingCandidate = await prisma.candidate.findUnique({
            where: { email: data.email },
        });


        const savedData = await prisma.candidate.upsert({
            where: { email: data.email },
            update: {
                ...data,
                age: Number(data.age),
                updated_at: new Date(),
            },
            create: {
                ...data,
                age: Number(data.age),
            },
        });

        if (savedData.resumeUrl) {
            deleteFile(savedData.resumeUrl);
        }

        console.log('savedData :>> ', savedData);

        const actionText = existingCandidate ? "edit" : "create";

        return NextResponse.json({
            message: `Form ${actionText === "create" ? "created" : "updated"} successfully!`,
            savedData,
        });

    } catch (error) {

        return NextResponse.json({ error: "Failed to handle form submission." }, { status: 500 });
    }
}
