import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BlockUserDialog from "./BlockUserDialog";

type UserType = {
  id: string;
  name: string;
  email: string;
  role: "client" | "driver" | "admin";
  status: "active" | "inactive" | "blocked" | "banned";
  blockReason?: string;
  blockedUntil?: Date;
};

type NewUserType = {
  name: string;
  email: string;
  role: "client" | "driver" | "admin";
};

const UserManagement = () => {
  const [users, setUsers] = useState<UserType[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "client",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "driver",
      status: "active",
    },
  ]);

  const { toast } = useToast();
  const [newUser, setNewUser] = useState<NewUserType>({
    name: "",
    email: "",
    role: "client",
  });

  const handleBlockUser = (userId: string, reason: string, permanent: boolean) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: permanent ? "banned" : "blocked",
          blockReason: reason,
          blockedUntil: permanent ? undefined : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
        };
      }
      return user;
    }));

    toast({
      title: permanent ? "Utilisateur banni" : "Utilisateur bloqué",
      description: permanent 
        ? "L'utilisateur a été banni définitivement de la plateforme" 
        : "L'utilisateur a été bloqué temporairement",
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const newUserData: UserType = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
    };

    setUsers([...users, newUserData]);
    setNewUser({ name: "", email: "", role: "client" });

    toast({
      title: "Succès",
      description: "L'utilisateur a été ajouté avec succès",
    });

    const dialogCloseButton = document.querySelector("[role='dialog'] button[type='button']") as HTMLButtonElement;
    if (dialogCloseButton) {
      dialogCloseButton.click();
    }
  };

  const handleEdit = (userId: string) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Succès",
      description: "L'utilisateur a été supprimé avec succès",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <User className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Nom complet</label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Nom complet"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Email"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role">Rôle</label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: "client" | "driver" | "admin") => 
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="driver">Chauffeur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddUser}>Ajouter l'utilisateur</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  user.status === "active" ? "bg-green-100 text-green-800" :
                  user.status === "blocked" ? "bg-orange-100 text-orange-800" :
                  user.status === "banned" ? "bg-red-100 text-red-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {user.status === "active" ? "Actif" :
                   user.status === "blocked" ? "Bloqué" :
                   user.status === "banned" ? "Banni" : "Inactif"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {user.role === "client" && user.status !== "banned" && (
                    <BlockUserDialog
                      userId={user.id}
                      userName={user.name}
                      onBlock={handleBlockUser}
                    />
                  )}
                  <Button variant="outline" size="icon" onClick={() => handleEdit(user.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
