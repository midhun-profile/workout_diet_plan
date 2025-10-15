'use client';

import React, { useEffect, useState } from 'react';
import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} from '@/lib/firebase/FirebaseCRUD';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { DocumentData } from 'firebase/firestore';

export default function UsersPage() {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [newUser, setNewUser] = useState('');
  const [editingUser, setEditingUser] = useState<DocumentData | null>(null);
  const [updatedName, setUpdatedName] = useState('');

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
    setNewUser('');
    fetchUsers();
  };

  const handleUpdate = async () => {
    if (editingUser && updatedName) {
      await updateUser(editingUser.id, { name: updatedName });
      fetchUsers();
      setEditingUser(null);
      setUpdatedName('');
    }
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">
            Manage Users
          </CardTitle>
          <CardDescription>
            A simple interface to create, read, update, and delete users.
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
                      <TableCell className="text-right">
                        <Dialog
                          onOpenChange={(open) => {
                            if (!open) {
                              setEditingUser(null);
                              setUpdatedName('');
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingUser(user);
                                setUpdatedName(user.name);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>
                                Update the user's name below.
                              </DialogDescription>
                            </DialogHeader>
                            <Input
                              value={updatedName}
                              onChange={(e) => setUpdatedName(e.target.value)}
                            />
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setEditingUser(null)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleUpdate}>
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the user.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(user.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
