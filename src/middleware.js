// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const MAIN_PROJECT_URL = 'http://localhost:3000';

export async function middleware(request) {
    const token = cookies().get("jwt");
  console.log(token)

  // Se o token não estiver presente, redirecione para a página de login do projeto principal
  if (!token) {
    return NextResponse.redirect(new URL('/login', MAIN_PROJECT_URL));
  }

  // Token é válido, permita o acesso à rota protegida
  return NextResponse.next();
}

// Especifique quais rotas devem ser protegidas pelo middleware
export const config = {
  matcher: [ '/api/:path*', '/homepage/:path*'], // Ajuste conforme necessário
};
