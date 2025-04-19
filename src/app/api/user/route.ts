import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

// Función para crear headers CORS con tipo seguro
const getCorsHeaders = (origin: string | null) => {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  // Solo incluye el origen si existe, de lo contrario usa wildcard (no recomendado para producción)
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*'; // Solo para desarrollo
  }
  
  return headers;
};

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
  
  export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const email = searchParams.get('email');
      const origin = req.headers.get('origin');
  
      if (!email) {
        return new NextResponse(
          JSON.stringify({ error: 'Email es requerido' }), 
          { status: 400, headers: getCorsHeaders(origin) }
        );
      }
  
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          name: true,
          phone: true,
          facebook: true,
          instagram: true,
          photo: true,
          urlShop: true,
          primaryColor: true,
          colorText: true,
          colorWha: true
        },
      });
  
      if (!user) {
        return new NextResponse(
          JSON.stringify({ error: 'Usuario no encontrado' }),
          { status: 404, headers: getCorsHeaders(origin) }
        );
      }
  
      return new NextResponse(
        JSON.stringify({ user }),
        { status: 200, headers: getCorsHeaders(origin) }
      );
    } catch (error) {
      console.error('Error:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Error en el servidor' }),
        { status: 500 }
      );
    }
  }
  
  // Manejador para peticiones OPTIONS (preflight)
  export async function OPTIONS(req: Request) {
    const origin = req.headers.get('origin');
    return new NextResponse(null, {
      headers: getCorsHeaders(origin)
    });
  }
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, facebook, instagram, primaryColor, colorText, colorWha } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        phone,
        facebook,
        instagram,
        primaryColor,
        colorText,
        colorWha
      },
    });

    return NextResponse.json({ message: 'Usuario actualizado', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}