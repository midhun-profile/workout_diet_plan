'use client';
import React, { useEffect, useState } from "react";
import { addUser, getUsers, updateUser, deleteUser } from "../lib/firebase/FirebaseCRUD";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import type { DocumentData } from 'firebase/firestore';

export default function Home() {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [newUser, setNewUser] = useState("");

  const fetchUsers = async () => {
    const allUsers = (await getUsers()) || [];
    setUsers(allUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser) return;
    await addUser({ name: newUser, email: `user${Date.now()}@example.com` });
    setNewUser("");
    fetchUsers();
  };

  const handleUpdate = async (id: string) => {
    const updatedName = prompt("Enter new name:");
    if (updatedName) {
      await updateUser(id, { name: updatedName });
      fetchUsers();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">
            Firebase CRUD
          </CardTitle>
          <CardDescription>
            A simple interface to manage users with Firebase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Enter name"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Add User</Button>
          </form>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                       <TableCell>{user.email}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleUpdate(user.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
