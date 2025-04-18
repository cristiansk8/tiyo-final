import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./app/lib/prisma";
import getCategories from "./app/(routes)/dashboard/user/profile/getCategories";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Register new user
          await prisma.user.create({
            data: {
              name: user.name || "No Name",
              email: user.email,
              photo: user.image || "",
            },
          });

          const dataCat = await getCategories();
          const userEmail = user.email
          // Crear múltiples categorías en una sola operación
          console.log("crear categorias")
          await prisma.userCategory.createMany({
            data: dataCat.map(category => ({
              userEmail: userEmail,
              categoryId: category.id.toString(),
              name: category.name || "Sin nombre",  // Must match model field name
              selected: true
            })),
            skipDuplicates: true
          });
        }


        return true;
      } catch (error) {
        console.error("Error registering user:", error);
        return false;
      }
    },
    async session({ session }) {
      if (session.user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (dbUser) {
          session.user.id = dbUser.id.toString();
        }
      }
      return session;
    },
  },
});
