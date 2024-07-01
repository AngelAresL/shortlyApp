"use client";
import Image from "next/image";
import { useState } from "react";

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/noUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.data.shortUrl);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="bg-white">
      <div className="relative isolate">
        {/* <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
        <div className="lg:pb-40 mx-auto max-w-2xl text-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="pb-16 flow-root">
              <Image
                src="/hero-logo.png"
                alt="Imagen de la App"
                className="aspect-[5/3]"
                width={700}
                height={700}
              />
            </div>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Shortea tu link y comparte
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Aqui podras acortar tus links y compartirlos con tus amigos.
                Rapido, facil y seguro.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <form
                  className="w-full max-w-3xl lg:col-span-5 lg:pt-2"
                  onSubmit={handleSubmit}
                >
                  <div className="flex gap-x-2">
                    <label htmlFor="name" className="sr-only">
                      Link
                    </label>
                    <input
                      id="name"
                      name="link"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Escriba su link"
                      required
                    />
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Short
                    </button>
                  </div>
                </form>
              </div>
              {shortUrl && (
                <p className="mt-4 text-green-600">
                  URL acortada: <a href={shortUrl}>{shortUrl}</a>
                </p>
              )}
              {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
