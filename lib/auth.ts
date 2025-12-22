import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Demo users for portfolio - in production, use database
const users = [
    {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        password: "$2a$10$mJAcFkSGxE3VfqpRXxG7.uJaVYWhHzKKqZ7cDxIJDwSjR8xLc9o5e", // "demo123"
        role: "Admin",
        image: null,
    },
    {
        id: "2",
        name: "John Admin",
        email: "admin@example.com",
        password: "$2a$10$mJAcFkSGxE3VfqpRXxG7.uJaVYWhHzKKqZ7cDxIJDwSjR8xLc9o5e", // "demo123"
        role: "Super Admin",
        image: null,
    },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = users.find((u) => u.email === credentials.email);
                if (!user) {
                    return null;
                }

                // Direct check for demo user to avoid bcrypt issues during dev
                if (credentials.email === "demo@example.com" && credentials.password === "demo123") {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image,
                    };
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
