"use client";

import { useState } from "react";
import { Button } from '../ui/button';
import { Home, LogOut, Package, PanelBottom, Settings2, ShoppingBag, Building2 } from 'lucide-react';
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex w-full flex-col bg-muted/40 relative">
            {/* Overlay para escurecer o fundo quando o menu estiver aberto */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity duration-300 z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-background transition-all duration-300 ${
                    isOpen ? "w-60" : "w-16"
                }`}
            >
                {/* Botão de abrir/fechar */}
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className="m-2" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <PanelBottom className="h-6 w-6" />
                </Button>

                <nav className="flex flex-col items-start gap-4 px-2 py-5">
                    <Link href='#' className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground rounded-full">
                        <Package className="h-4 w-4"/>
                    </Link>
                    
                    {[
                        { href: "/", icon: Home, label: "Inicio" },
                        { href: "/itens", icon: ShoppingBag, label: "Itens" },
                        { href: "/produtos", icon: Package, label: "Meus Produtos" },
                        { href: "/estabelecimentos", icon: Building2, label: "Estabelecimentos" },
                        { href: "/", icon: Settings2, label: "Configurações" },
                    ].map((item, index) => (
                        <Link key={index} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all">
                            <item.icon className="h-5 w-5" />
                            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Botão de logout */}
                <nav className="mt-auto flex flex-col items-start gap-4 px-2 py-5">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all">
                                <LogOut className="h-5 w-5" />
                                {isOpen && <span className="text-sm font-medium">Sair</span>}
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
                                <DialogDescription>
                                    Você será desconectado da sua conta.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-2">
                                <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">
                                    Cancelar
                                </button>
                                <Link href='/logout' className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">
                                    Sair
                                </Link>
                            </div>
                        </DialogContent>
                    </Dialog>
                </nav>
            </aside>
        </div>
    );
}
