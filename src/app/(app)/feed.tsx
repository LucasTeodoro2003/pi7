import db from "@/shared/lib/prisma";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Products } from "@prisma/client";

export default function Example({ products }: { products: Products[] }) {
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
                        <EnvelopeIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{product.userProduct}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Criada em{" "}
                          <time dateTime={"application.date"}>
                            {product.createdAt.toLocaleDateString()}
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          {"application.stage"}
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
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
