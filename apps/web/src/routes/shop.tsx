import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { getShops } from "@/apis/shop";
import useUser from "@/hooks/useUser";

interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    hex: string;
    class: string;
}

export const Route = createFileRoute("/shop")({
    component: RouteComponent,
    loader: async () => {
        return await getShops();
    },
});

function RouteComponent() {
    const { themes } = useLoaderData({ from: "/shop" });
    const { user } = useUser();

    const handleBuy = (item: ShopItem) => {
        if (!user) return;
        if (user.totalCoins < item.price) {
            toast.error("Insufficient Funds", {
                description: "Complete more daily shifts to earn coins.",
            });
            return;
        }
        toast.success(`Purchased ${item.name}`);
        // TODO: Call buyShopItem(item.id)
    };

    const handleEquip = (item: ShopItem) => {
        toast.info(`System Updated: ${item.name}`);
        // TODO: Call equipTheme(item.id)
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 p-6 font-mono text-zinc-300 lg:p-12">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <div className="mt-4 flex flex-col justify-between gap-4 border-zinc-800 border-b pb-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="font-black text-4xl text-white uppercase tracking-tight md:text-5xl">
                            Shop
                        </h1>
                        <p className="mt-2 text-sm text-zinc-500">
                            Cosmetic, not P2W yes
                        </p>
                    </div>

                    {/* Coin Display */}
                    <div className="flex items-center gap-3 rounded-sm border border-zinc-800 bg-zinc-900 px-6 py-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-yellow-500/50 bg-yellow-500/10">
                            <span className="text-lg text-yellow-500">$</span>
                        </div>
                        <div>
                            <div className="font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
                                Available Money
                            </div>
                            <div className="font-bold text-white text-xl leading-none">
                                {user?.totalCoins || 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Not Implemented yet</h2>
                </div>
                <div>
                    <h2 className="mb-6 flex items-center gap-2 font-bold text-sm text-zinc-500 uppercase tracking-widest">
                        Visual Interface
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {themes.map((item: ShopItem) => {
                            const isOwned =
                                user?.inventory?.themes.includes(item.id) ||
                                item.price === 0;
                            const isEquipped = user?.activeTheme === item.id; // Or whatever field you store active theme in

                            return (
                                <ThemeShopCard
                                    key={item.id}
                                    item={item}
                                    isOwned={isOwned}
                                    isEquipped={isEquipped}
                                    onBuy={() => handleBuy(item)}
                                    onEquip={() => handleEquip(item)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ThemeShopCard({ item, isOwned, isEquipped, onBuy, onEquip }: any) {
    return (
        <div
            className={`group relative flex flex-col gap-6 border bg-zinc-900/30 p-6 transition-all duration-300 ${
                isEquipped
                    ? "border-green-500 bg-green-950/10 shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                    : "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50"
            }
        `}
        >
            {isEquipped && (
                <div className="absolute top-0 right-0 bg-green-600 px-2 py-1 font-bold text-[10px] text-black uppercase tracking-widest">
                    Active
                </div>
            )}

            <div className="flex items-start justify-between">
                <div
                    className="flex h-16 w-16 items-center justify-center border-2 bg-zinc-950"
                    style={{ borderColor: item.hex }}
                >
                    <span
                        className="select-none font-black text-2xl"
                        style={{ color: item.hex }}
                    >
                        A_
                    </span>
                </div>

                {!isOwned && (
                    <div className="text-right">
                        <div className="font-bold text-sm text-white">
                            {item.price} $
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase">
                            Cost
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h3 className="font-bold text-sm text-white uppercase tracking-wider transition-colors group-hover:text-green-400">
                    {item.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                    {item.description}
                </p>
            </div>

            {/* Action Area */}
            <div className="mt-auto border-zinc-800/50 border-t pt-4">
                {isOwned ? (
                    <button
                        type="button"
                        onClick={onEquip}
                        disabled={isEquipped}
                        className={`flex w-full items-center justify-center gap-2 py-3 font-bold text-xs uppercase tracking-widest transition-all ${
                            isEquipped
                                ? "cursor-default bg-zinc-800 text-zinc-500 opacity-50"
                                : "bg-zinc-800 text-white hover:bg-green-600 hover:text-black"
                        }
                        `}
                    >
                        {isEquipped ? (
                            <>
                                <Check size={14} /> Active
                            </>
                        ) : (
                            "Install Module"
                        )}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onBuy}
                        className="flex w-full items-center justify-center gap-2 bg-white py-3 font-bold text-black text-xs uppercase tracking-widest transition-colors hover:bg-zinc-200"
                    >
                        <ShoppingCart size={14} />
                        Purchase
                    </button>
                )}
            </div>
        </div>
    );
}
