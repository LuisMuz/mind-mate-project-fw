import { BanknotesIcon, IdentificationIcon, UserCircleIcon } from "@heroicons/react/24/outline";


const iconMap = {
    psychologist: IdentificationIcon,
    client: UserCircleIcon
};
  
export default async function CardWrapper() {


  return (
    <>
      <Card title="Psychologists" value={13} type="psychologist" />
      <Card title="Clients" value={35} type="client" />
    </>
  );
}
  
export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'psychologist' | 'client';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
