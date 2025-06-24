import { deleteProduct } from "@/shared/lib/actionsProducts";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Products, User } from "@prisma/client";
import { BadgeDollarSign, SquarePen, Trash2 } from "lucide-react";

interface ExampleProps {
  products: Products[];
  user: User;
}

export default function Example({ products, user }: ExampleProps) {
  const userPermission = (user.permission === 3);
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id}>
            <a href={product.link} className="block hover:bg-gray-50">
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
                  <div className="flex w-16 gap-x-2.5">
                    <dt>
                      <ChatBubbleLeftIcon className="w-6 h-6 text-gray-400" />
                    </dt>
                    <dd className="text-gray-900 text-sm">{3}</dd>
                  </div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {userPermission ? (
                  <div className="flex text-sm row-span-2 text-end">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-red-100 rounded p-1"
                      title="Delete"
                    >
                      <Trash2 className="text-gray-500 hover:text-red-600" />
                    </button>
                    <button
                      onClick={()=>{}}
                      className="ml-2 transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-yellow-100 rounded p-1"
                      title="Edity"
                    >
                      <SquarePen className="text-gray-500 hover:text-yellow-500" />
                    </button>
                  </div>
                  ):(<></>)}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
