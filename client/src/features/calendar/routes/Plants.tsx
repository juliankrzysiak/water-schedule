import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/components/Notification";
import { getAllPlants } from "../api";
import { Loader } from "@/components/Loader";
import { ErrorPage } from "@/routes/ErrorPage";
import { List } from "../components/List";
import { sortAsc } from "@/utils/sortAsc";
import { useShowStore } from "../stores/showStore";
import { AddPlant } from "../components/Forms/AddPlant";
import { DeletePlant } from "../components/Forms/DeletePlant";

export const Plants = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const [showCreateForm, showDeleteForm] = useShowStore((state) => [
    state.createForm,
    state.deletePlant,
  ]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  const showForm = () => {
    if (showCreateForm) return <AddPlant />;
    if (showDeleteForm) return <DeletePlant plants={data} />;
    return <List plants={sortAsc(data)} />;
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-bl from-blue-100 via-blue-300 to-blue-500 p-4">
      <section className=" flex w-full max-w-sm flex-col rounded-md bg-gray-900/20  p-4 shadow-lg">
        {showForm()}
      </section>
      <Notification />
    </main>
  );
};
