import { NextRequest, NextResponse } from 'next/server';

const MAIN_PROJECT_URL = 'http://localhost:3000';
const PMS_PROJECT_URL = 'http://localhost:3001';

export async function middleware(request) {
  const token = request.cookies.get('token');
  const url = new URL(request.url);

  // Verificar se estamos na URL do MAIN_PROJECT_URL
  const isMainProject = url.origin === MAIN_PROJECT_URL;
  const isPmsProject = url.origin === PMS_PROJECT_URL;

  // Se não estiver na página de login, verifique o token
  if (isMainProject || isPmsProject) {
    if (!token) {
      // Se o token não estiver presente, redirecione para a página de login
      if (isMainProject) {
        return NextResponse.redirect(new URL('/login', MAIN_PROJECT_URL));
      } else {
        return NextResponse.redirect(new URL('/homepage', PMS_PROJECT_URL));
      }
    }

    // Verifique o token com a API do projeto principal
    const response = await fetch(`${MAIN_PROJECT_URL}/api/cookies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    // Se o token não for válido, redirecione para a página de login
    if (!data.valid) {
      if (isMainProject) {
        return NextResponse.redirect(new URL('/login', MAIN_PROJECT_URL));
      } else {
        return NextResponse.redirect(new URL('/homepage', PMS_PROJECT_URL));
      }
    }

    // Se o token for válido e o acesso é ao MAIN_PROJECT_URL, redirecione para o PMS_PROJECT_URL
    if (isMainProject) {
      return NextResponse.redirect(new URL('/', PMS_PROJECT_URL));
    }

    // Se o token for válido e o acesso é ao PMS_PROJECT_URL, permita o acesso
    if (isPmsProject) {
      return NextResponse.next();
    }
  }

  // Permita o acesso a URLs não protegidas ou não especificadas no matcher
  return NextResponse.next();
}

// Especifique quais rotas devem ser protegidas pelo middleware
export const config = {
  matcher: ['/protected/:path*', '/api/:path*', '/homepage/:path*', '/:path*'], // Ajuste conforme necessário
};
