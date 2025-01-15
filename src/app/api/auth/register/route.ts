import {NextRequest, NextResponse} from "next/server";
import {hashPassword} from "@/lib/utils/bcrypt";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return NextResponse.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
        return NextResponse.json({ error: 'Registration failed' }, { status: 400 });
    }
}