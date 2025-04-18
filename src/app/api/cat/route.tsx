// app/api/save-preferences/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function PUT(request: Request) {
    try {
      const { email, selectedCategories } = await request.json();
  
      if (!email || !selectedCategories) {
        return NextResponse.json(
          { error: "Email y selectedCategories son requeridos" },
          { status: 400 }
        );
      }
  
      // Verificar que el usuario existe
      const userExists = await prisma.user.findUnique({
        where: { email: email }
      });
  
      if (!userExists) {
        return NextResponse.json(
          { error: "Usuario no encontrado" },
          { status: 404 }
        );
      }
  
      // Obtener categorías existentes del usuario
      const userCategories = await prisma.userCategory.findMany({
        where: { userEmail: email }
      });
  
      // Normalizar selectedCategories a enteros (si es necesario)
      const selectedIds = selectedCategories.map((id: string | number) => Number(id));
  
      // Preparar operaciones de actualización
      const updateOperations = userCategories.map((category) => {
        return prisma.userCategory.update({
          where: {
            userEmail_categoryId: {
              userEmail: email,
              categoryId: category.categoryId,
            },
          },
          data: {
            selected: selectedIds.includes(Number(category.categoryId)),
          },
        });
      });
  
      await prisma.$transaction(updateOperations);
  
      return NextResponse.json({
        success: true,
        updatedCount: updateOperations.length,
      });
    } catch (error) {
      console.error("Error en PUT /api/cat:", error);
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }
  

export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get('email');
  
      // Validación del email
      if (!email) {
        return NextResponse.json(
          { error: "El parámetro 'email' es requerido" },
          { status: 400 }
        );
      }
  
      // Verificar que el usuario existe
      const userExists = await prisma.user.findUnique({
        where: { email: email }
      });
  
      if (!userExists) {
        return NextResponse.json(
          { error: "Usuario no encontrado" },
          { status: 404 }
        );
      }
  
      // Obtener categorías del usuario
      const userCategories = await prisma.userCategory.findMany({
        where: { userEmail: email },
        select: {
          categoryId: true,
          name: true,
          selected: true,
          createdAt: true
        },
        orderBy: {
          name: 'asc' // Ordenar alfabéticamente por nombre
        }
      });
  
      return NextResponse.json(userCategories);
    } catch (error) {
      console.error("Error en GET /api/user-categories:", error);
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }