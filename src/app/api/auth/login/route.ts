import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {comparePassword} from "@/lib/utils/bcrypt";
import {signToken} from "@/lib/utils/jwt";

export default async function POST(req: NextRequest) {
    try {
        const {email, password} = req.json();
        const user = await prisma.user.findUnique({where: {email}});

        if (!user || !(await comparePassword(password, user.password))) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = signToken({
            id: user.id,
            email: user.email,
        })

        return NextResponse.json({ token });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 400 });
    }
}