"use client";

import { Fragment, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Feed from "./feed";
import { Prisma, Products, User } from "@prisma/client";
import signGoOut from "@/shared/lib/signOut";
import ModalServer from "../../feature/updateUser/ui/modalserver";
import ModalServerProduct from "@/feature/createdPromotion/ui/modalserver";
import ModalServerAuthorizeProducts from "@/feature/autorizePromotion/ui/modalserver";
import ModalServerPermission from "@/feature/authorizeUserPermission/ui/modalserver";
import ModalServerSendRequest from "@/feature/sendRequest/ui/modalserver";
import ModalPerfil from "@/feature/updateMyPerfil/ui/modalserver";

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://b.fssta.com/uploads/application/soccer/headshots/713.vresize.350.350.medium.34.png',
// }

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface PageClientProps {
  user: User;
  firtsname: string;
  users: User[];
  products: Prisma.ProductsGetPayload<{
    include: { comments: { include: { user: true } } };
  }>[];
  allProducts: Products[];
}

export default function PageClient({
  user,
  products,
  allProducts,
  users,
}: PageClientProps) {
  const [openPromotion, setOpenPromotion] = useState(false);
  const [openAuthorize, setOpenAuthorize] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);
  const [openPerfil, setOpenPerfil] = useState(false);
  const [openRequest, setSendRequest] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsList] = useState(products);
  const [, setCurrentPage] = useState(0);

  const filteredProducts = productsList.filter((products) =>
    products.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigation = [
    { name: "Tudo", href: "/", current: false },
    { name: "Produtos", href: "/?type=products", current: true },
    { name: "Cupons", href: "/?type=coupons", current: false },
    ...(user.permission !== 1
      ? [
          {
            name: "Nova Promoção",
            onclick: () => {
              setOpenPromotion(true);
            },
            current: false,
          },
        ]
      : []),
    ...(user.permission === 3
      ? [
          {
            name: "Verficar Posts",
            onclick: () => {
              setOpenAuthorize(true);
            },
            current: false,
          },
        ]
      : []),
  ];
  const userNavigation = [
    { name: "Seu Perfil", onclick: () => {
      setOpenPerfil(true)
    } },
    ...(user.permission !== 3
      ? [
          {
            name: "Solicitar Acesso Avançado",
            onclick: () => {
              setSendRequest(true);
            },
            current: false,
          },
        ]
      : []),
    ...(user.permission === 3
      ? [
          {
            name: "Gerenciar Usuarios",
            onclick: () => {
              setOpenPermission(true);
            },
            current: false,
          },
        ]
      : []),
    { name: "Sair", href: "#", onclick: signGoOut },
  ];

  return (
    <>
      <div className="min-h-full bg-gray-100">
        <Popover as="header" className="bg-sky-600 pb-24">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static">
                    <a href="#">
                      <span className="sr-only">MixPromo</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=300"
                        alt="MixPromo"
                      />
                    </a>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.image || "ney.jpg"}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  onClick={item.onclick}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  {/* Search */}
                  <div className="min-w-0 flex-1 px-12 lg:hidden">
                    <div className="mx-auto w-full max-w-xs">
                      <label htmlFor="desktop-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="desktop-search"
                          className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                          placeholder="Pesquisar..."
                          type="search"
                          name="search"
                          // onChange={(e) => {
                          //   e.target.value
                          //     ? router.replace("/?search=" + e.target.value)
                          //     : router.replace("/");
                          // }}
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-sky-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                  <div className="grid grid-cols-3 items-center gap-8">
                    <div className="col-span-2">
                      <nav className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={item.onclick}
                            className={classNames(
                              item.current ? "text-white" : "text-sky-100",
                              "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10 hover:cursor-pointer"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                    <div>
                      <div className="mx-auto w-full max-w-md">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-white focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="mobile-search"
                            className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="Pesquisar..."
                            type="search"
                            name="search"
                            // onChange={(e) => {
                            //   e.target.value
                            //     ? router.replace("/?search=" + e.target.value)
                            //     : router.replace("/");
                            // }}
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(0);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                    >
                      <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=sky&shade=600"
                                alt="MixPromo"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                onClick={item.onclick}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.image || "ney.jpg"}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="truncate text-base font-medium text-gray-800">
                                {user.name}
                              </div>
                              <div className="truncate text-sm font-medium text-gray-500">
                                {user.email}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                onClick={item.onclick}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <Feed products={filteredProducts} user={user} />
                  <ModalServer user={user} />
                  <ModalServerProduct
                    user={user}
                    openProduct={openPromotion}
                    setOpenProduct={setOpenPromotion}
                  />
                  <ModalServerAuthorizeProducts
                    user={user}
                    openAuthorize={openAuthorize}
                    setOpenAuthorize={setOpenAuthorize}
                    products={allProducts}
                  />
                  <ModalServerPermission
                    user={user}
                    users={users}
                    openPermission={openPermission}
                    setOpenPermission={setOpenPermission}
                  />
                  <ModalServerSendRequest
                    user={user}
                    setOpenModal={setSendRequest}
                    openModal={openRequest}
                  />
                  <ModalPerfil openPerfil={openPerfil} setOpenPerfil={setOpenPerfil} user={user}/>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4 max-w-96 mx-auto sticky top-12">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <a
                        className="w-full"
                        href="https://max.com"
                        target="_blank"
                      >
                        <img
                          className="w-full"
                          src="https://s0.2mdn.net/simgad/6944951142170773320"
                        ></img>
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2025 MixPromo, Ltda.
              </span>{" "}
              <span className="block sm:inline">
                Todos os direitos reservados.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
