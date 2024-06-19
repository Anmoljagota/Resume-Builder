import { updateUserDetails } from "@/apis/admin/user";
import { useMyDetails } from "@/hooks/useAuth";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
interface IFormType {
  batch?: string;
  section?: string;
}

const BatchUsernameForm = () => {
  const { data, refetch } = useMyDetails();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      batch: data?.batch || "",
      username: data?.username || "",
    },
  });
  const handleUpdateUser = (formData: IFormType) => {
    data?._id &&
      updateUserDetails(data?._id, formData)
        .then(() => {
          refetch();
          toast.success("Data Updated Successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
  };
  const displayModal = useMemo(() => {
    if (data?.role !== "Admin" && (!data?.batch || !data?.username || data?.batch === "" || data?.username === ""))
      return true;
    return false;
  }, [data]);
  const [showModal, setShowModal] = useState(displayModal);
  return (
    <div>
      <Modal show={showModal} size={"md"}>
        <Modal.Body className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-black text-xl">Batch And Section</h3>
            {data?.role === "Admin" && (
              <GrClose
                onClick={() => {
                  setShowModal(false);
                }}
                className="cursor-pointer"
              />
            )}
          </div>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <Label>
              Batch
              <Controller
                name="batch"
                control={control}
                render={({ field }) => <TextInput {...field} className="mb-2" />}
              />
            </Label>
            <Label>
              Username
              <Controller
                name="username"
                control={control}
                render={({ field }) => <TextInput {...field} className="mb-2" />}
              />
            </Label>
            <Button type="submit" className="uppercase w-full mt-4">
              update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      {(!data?.batch || !data?.username) && (
        <p
          className="text-green-500 font-bold text-md cursor-pointer"
          onClick={() => {
            setShowModal(true);
          }}
        >
          + Add Batch And Username
        </p>
      )}
    </div>
  );
};
export default BatchUsernameForm;
