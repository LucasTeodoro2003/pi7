import { deleteProduct } from "@/shared/lib/actionsProducts";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Prisma, Products, User } from "@prisma/client";
import { BadgeDollarSign, SquarePen, Trash2 } from "lucide-react";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createComment } from "@/feature/commentPromotion/api/create-comment";

interface ExampleProps {
  products: Prisma.ProductsGetPayload<{
    include: { comments: { include: { user: true } } };
  }>[];
  user: User;
}

export default function Example({ products, user }: ExampleProps) {
  const userPermission = user.permission === 3;
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {products.map((product) => (
          <ProductView
            key={product.id}
            product={product}
            userPermission={userPermission}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
}

function ProductView({
  product,
  userPermission,
  user,
}: {
  product: Prisma.ProductsGetPayload<{
    include: { comments: { include: { user: true } } };
  }>;
  userPermission: boolean;
  user: User;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <a href={product.link} className="block hover:bg-gray-50" target="_blank">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src={product.image}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="truncate text-sm font-medium text-sky-600">
                  {product.nome}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <BadgeDollarSign
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-amber-700"
                    aria-hidden="true"
                  />
                  <span className="truncate">R${product.price}</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div>
                  <p className="text-sm text-gray-900">
                    Criada em{" "}
                    <time dateTime={"application.date"}>
                      {product.createdAt.toLocaleDateString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                      })}
                    </time>
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <CheckCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                      aria-hidden="true"
                    />
                    Verificado
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div
              className="flex w-16 gap-x-2.5 cursor-pointer group"
              onClick={(e) => {
                setOpen(true);
                e.preventDefault();
              }}
            >
              <dt>
                <ChatBubbleLeftIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-700" />
              </dt>
              {product.comments.length > 0 && (
                <dd className="text-gray-900 text-sm">
                  {product.comments.length}
                </dd>
              )}
            </div>
            <ChevronRightIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            {userPermission ? (
              <div className="flex text-sm row-span-2 text-end">
                <button
                  onClick={(e) => {deleteProduct(product.id); e.preventDefault()}}
                  className="transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-red-100 rounded p-1"
                  title="Delete"
                >
                  <Trash2 className="text-gray-500 hover:text-red-600" />
                </button>
                <button
                  onClick={(e) => {e.preventDefault()}}
                  className="ml-2 transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-yellow-100 rounded p-1"
                  title="Edity"
                >
                  <SquarePen className="text-gray-500 hover:text-yellow-500" />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </a>

      <ProductCommentsDialog
        product={product}
        comments={product.comments}
        user={user}
        open={open}
        setOpen={setOpen}
      />
    </li>
  );
}

export function ProductCommentsDialog({
  product,
  comments,
  user,
  open,
  setOpen,
}: {
  product: Products;
  comments: Prisma.CommentsGetPayload<{ include: { user: true } }>[];
  user: User;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 mx-4 w-full sm:max-w-lg sm:p-6">
                <div className="flow-root">
                  <ul
                    role="list"
                    className="max-h-[calc(90vh-200px)] overflow-y-auto"
                  >
                    {comments.map((comment, idx) => (
                      <li key={comment.id}>
                        <div className="relative pb-8">
                          {idx !== comments.length - 1 ? (
                            <span
                              className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <img
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                src={comment.user.image || ""}
                                alt=""
                              />

                              <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                                <ChatBubbleLeftEllipsisIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {comment.user.name}
                                  </a>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {comment.createdAt.toLocaleString()}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-700">
                                <p>{comment.texto}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <ProductCommentsInput user={user} product={product} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function ProductCommentsInput({
  user,
  product,
}: {
  user: User;
  product: Products;
}) {
  const [text, setText] = useState("");

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={user.image || ""}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-sky-600">
            <label htmlFor="comment" className="sr-only">
              Escreva um comentário
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block outline-none px-1.5 w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Escreva um comentário..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                onClick={() => {
                  createComment(user.id, product.id, text);
                }}
              >
                Postar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
