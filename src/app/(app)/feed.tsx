import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const applications = [
  {
    applicant: {
      name: "Ricardo Cooper",
      email: "ricardo.cooper@example.com",
      imageUrl:
        "https://api.pelando.com.br/media/11f5dbf7-f30c-4685-b6a9-5f5b631f94db?v=3&t=eyJoZWlnaHQiOjIzOH0%3D",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "Completed phone screening",
    href: "#",
  },
  {
    applicant: {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      imageUrl:
        "https://api.pelando.com.br/media/2de02df6-3c84-4cd2-8a0a-ff30a48db1b9?v=3&t=eyJoZWlnaHQiOjIzOH0%3D",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "Completed phone screening",
    href: "#",
  },
  {
    applicant: {
      name: "Ted Fox",
      email: "ted.fox@example.com",
      imageUrl:
        "https://api.pelando.com.br/media/b1db7f26-34d8-495c-a3ef-427a2b7424c7?v=3&t=eyJoZWlnaHQiOjIzOH0%3D",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    stage: "Completed phone screening",
    href: "#",
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
                          Applied on{" "}
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
                    <dd className="text-gray-900 text-sm">24</dd>
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
