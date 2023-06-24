import React, { useState } from "react";
import { useContract, useMintNFT } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";

export default function Component() {
  const { contract } = useContract("0x107E64D41044eAf1bBC181c47ddA0Fb60F577071");
  const { mutate: mintNft, isLoading, error } = useMintNFT(contract);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  if (error) {
    console.error("failed to mint NFT", error);
  }

  const handleMint = () => {
    const metadata = {
      name,
      description,
      image,
    };

    mintNft({
      metadata,
      to: "0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132",
    });
  };

  return (
    <Container maxWidth="lg">
      <h1>Mint an NFT</h1>
      <form className="space-y-4">
        <div className="mb-4">
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-400 rounded px-2 py-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-400 rounded px-2 py-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-400 rounded px-2 py-1"
            />
          </label>
        </div>
      </form>
      <button disabled={isLoading} onClick={handleMint} className="text-center border-4 border-sky-500 p-2">
        Mint!
      </button>
    </Container>
  );
}
