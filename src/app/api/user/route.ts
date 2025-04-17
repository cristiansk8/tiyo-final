import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
      const body = await req.json(); // Obtiene los datos del request
      const { email, name, phone, photo, facebook, instagram } = body;
  
      // Verifica si el usuario ya existe por email
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
      }
  
      // Crea el usuario en la base de datos
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          phone,
          photo,
          instagram,
          facebook
        },
      });
  
      return NextResponse.json({ message: "Usuario creado exitosamente", user: newUser }, { status: 201 });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
  }
// Servicio para verificar si el usuario está registradoimport prisma from '@/app/lib/prisma';
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        phone: true,
        facebook: true,
        instagram: true,
        photo: true
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Configura headers CORS para permitir acceso desde otros dominios
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
    };

    return NextResponse.json(
      { user },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, facebook, instagram } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        phone,
        facebook,
        instagram
      },
    });

    return NextResponse.json({ message: 'Usuario actualizado', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}