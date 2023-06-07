import Calendar from "./components/Calendar";
import { useQuery } from "@tanstack/react-query";
import { getAllPlants } from "./api";
import { Info } from "./components/Info";
import { Menu } from "./components/Menu";
import { useShowStore } from "./store";
import { AddPlant } from "@/components/Forms/AddPlant";
import { Toast } from "@/components/Toast";
import { DeletePlant } from "./components/Forms/DeletePlant";

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlants,
  });
  const showCreateForm = useShowStore((state) => state.createForm);
  const showDeleteForm = useShowStore((state) => state.deletePlant);

  if (isLoading) return <main>Loading...</main>;
  if (isError) return <main>Something went wrong!</main>;

  const showForm = () => {
    if (showCreateForm) return <AddPlant />;
    if (showDeleteForm) return <DeletePlant plants={data} />;
    return <Info plants={data} />;
  };

  return (
    <main>
      <Calendar plants={data} />
      {showForm()}
      <Menu />
      <Toast />
    </main>
  );
}
