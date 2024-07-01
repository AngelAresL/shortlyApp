"use client";
import { useRouter, useSearchParams } from 'next/navigation';

const AuthError = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error === 'OAuthAccountNotLinked') {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cuenta no vinculada
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Parece que no tienes una cuenta vinculada a este correo electrónico.
            Por favor, regístrate primero o inicia sesión con otro método.
          </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => router.push('/register')}
            >
              Regístrate
            </button>
            <button
              className="mt-4 flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={() => router.push('/login')}
            >
              Iniciar sesión con otro método
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Error
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ha ocurrido un error. Por favor, intenta nuevamente.
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <button
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={() => router.push('/login')}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthError;