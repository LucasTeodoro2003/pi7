import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const applications = [
  {
    applicant: {
      name: "Jogo Mafia 3",
      email: "Luis Henrique",
      imageUrl:
        "https://api.pelando.com.br/media/11f5dbf7-f30c-4685-b6a9-5f5b631f94db?v=3&t=eyJoZWlnaHQiOjIzOH0%3D",
    },
    date: "2020-01-07",
    dateFull: "25 de abril de 2025",
    stage: "Promoção Verificada",
    href: "#",
    comments: 17,
  },
  {
    applicant: {
      name: "Kit 3 Camisas Básicas",
      email: "Francisnaldo Gomes",
      imageUrl:
        "https://api.pelando.com.br/media/2de02df6-3c84-4cd2-8a0a-ff30a48db1b9?v=3&t=eyJoZWlnaHQiOjIzOH0%3D",
    },
    date: "2020-01-07",
    dateFull: "25 de abril de 2025",
    stage: "Promoção Verificada",
    href: "#",
    comments: 7,
  },
  {
    applicant: {
      name: "Amaciante Líquido Minuano",
      email: "Fátima Porto",
      imageUrl:
        "https://api.pelando.com.br/media/b1db7f26-34d8-495c-a3ef-427a2b7424c7?v=3&t=eyJoZWlnaHQiOjIzOH0%3D",
    },
    date: "2020-01-07",
    dateFull: "25 de abril de 2025",
    stage: "Promoção Verificada",
    href: "#",
    comments: 4,
  },
  {
    applicant: {
      name: "Cereal Matinal KitKat Chocolate Nestlé 210g",
      email: "Guilherme Prata",
      imageUrl:
        "https://media.pelando.com.br/P4jfIc0lEIKSvMIcjDXbED3bWfY=/0x100/d/1000065049-1746504312595.jpg",
    },
    date: "2020-01-07",
    dateFull: "25 de abril de 2025",
    stage: "Promoção Verificada",
    href: "#",
    comments: 4,
  },
  {
    applicant: {
      name: "Notebook Gamer Acer Nitro V15",
      email: "Lucas Henrique",
      imageUrl:
        "https://images6.kabum.com.br/produtos/fotos/564916/notebook-gamer-acer-nitro-v15-intel-core-i5-13420h-8gb-ram-geforce-rtx-3050-ssd-512gb-15-6-fhd-ips-144hz-windows-11-preto-anv15-51-58az_1715197002_g.jpg",
    },
    date: "2020-01-07",
    dateFull: "25 de abril de 2025",
    stage: "Promoção Verificada",
    href: "#",
    comments: 4,
  },
  {
    applicant: {
      name: "Tênis Nike Air Max SC Masculino - Azul+Branco",
      email: "Júlio Gomes",
      imageUrl:
        "https://media.pelando.com.br/2OGB8BggVe90xHwrl96o2_NyVf0=/0x100/d/screen-shot-05-06-25-at-0515-pm-1746562546994.JPG",
    },
    date: "2020-01-07",
    dateFull: "25 de abril de 2025",
    stage: "Promoção Verificada",
    href: "#",
    comments: 4,
  },
];

export default function Example() {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {applications.map((application) => (
          <li key={application.applicant.email}>
            <a href={application.href} className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={application.applicant.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-sky-600">
                        {application.applicant.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <EnvelopeIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          {application.applicant.email}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Criada em{" "}
                          <time dateTime={application.date}>
                            {application.dateFull}
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          {application.stage}
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
                    <dd className="text-gray-900 text-sm">{application.comments}</dd>
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
