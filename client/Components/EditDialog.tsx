import { Loader2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import React, { useState, useEffect } from "react";
import { Input } from "../src/components/ui/input";
import { toast } from "react-toastify";

type Profiledata = {
  fullname: string;
  username: string;
  email: string;
  onSave: ({fullname, username, email}: Profiledata) => void;
};

const EditDialog = ({ fullname, username, email, onSave }: Profiledata) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    Fullname: "",
    Username: "",
    Email: email,
  });

  useEffect(() => {
    if (open) {
      setUser({
        Fullname: fullname,
        Username: username,
        Email: email,
      });
    }
  }, [open, fullname, username, email]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const api = await fetch("https://resulyzer.onrender.com/api/updateProfile", {
        method: "PUT",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await api.json();

      onSave({
        fullname: user.Fullname,
        username: user.Username,
        email: user.Email,
        onSave
      });

      if (api.status === 200) {
        toast.success(res.message);
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500 transition-all flex justify-center items-center gap-2">
          <Pencil size={18} />
          Edit profile
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <DialogDescription className="flex flex-col gap-4">
          <label htmlFor="fullname">Fullname</label>
          <Input
            id="Fullname"
            placeholder="Enter new fullname"
            value={user.Fullname}
            onChange={handleChange}
          />

          <label htmlFor="username">Username</label>
          <Input
            id="Username"
            placeholder="Enter new username"
            value={user.Username}
            onChange={handleChange}
          />
        </DialogDescription>

        <DialogFooter>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-400 hover:bg-blue-500 transition-all rounded-lg text-white w-full flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
