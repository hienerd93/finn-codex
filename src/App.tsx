import { useEffect, useState } from "react";
import { create } from "zustand";
import { emptyString, getLocal, jsonGsString } from "@/lib/utils";
import { lexisSchema } from "@/data/schema";
import { DataTable } from "@/components/ui/data-table";
import { columns, Vocabulary } from "@/components/vocalbularyColumns";
import { SheetInfoForm } from "@/components/ui/sheet-info-form";
import { FlipCard } from "@/components/ui/flip-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardsChat } from "@/components/ui/cards-chat";

type Store = {
  lexis: Vocabulary[];
  sheetId: string;
  setLexis: (payload: Vocabulary[]) => void;
  setSheetId: (payload: string) => void;
};

const useStore = create<Store>()((set) => ({
  lexis: [],
  sheetId: "",
  setLexis: (payload) => set(() => ({ lexis: payload })),
  setSheetId: (payload) => set(() => ({ sheetId: payload })),
}));

function App() {
  const { lexis, setLexis, setSheetId, sheetId } = useStore();

  const [selected, setSelected] = useState<string[]>(
    getLocal("selectedWord") || []
  );
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const sheetSheetInfo = (sheetIdValue: string) => {
    setSheetId(sheetIdValue);
  };

  useEffect(() => {
    const batchGetValues = async (sheetId: string, query = "select *") => {
      if (!sheetId) {
        return;
      }

      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?&sheet=oxford3000&tq=${encodeURIComponent(
        query
      )}`;
      const result = await fetch(url).then((res) => res.text());
      const lexis = lexisSchema.parse(jsonGsString(result));
      setLexis(
        lexis.table.rows.map((item) => ({
          no: emptyString(item.c[0]?.v),
          word: emptyString(item.c[1]?.v),
          type: emptyString(item.c[2]?.v),
          pronounce: emptyString(item.c[3]?.v),
          meaning: emptyString(item.c[4]?.v),
        }))
      );
    };

    batchGetValues(sheetId);
  }, [setLexis, sheetId]);

  return (
    <>
      <div>
        {!lexis.length ? (
          <div className="mt-20 text-center">
            <Dialog>
              <DialogTrigger>
                <Button>Open Sheet</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Open your sheet with ID</DialogTitle>
                  <DialogDescription>
                    <SheetInfoForm setSheetInfo={sheetSheetInfo} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="flex bg-gray-100 max-w-screen min-h-screen">
            <div className="hidden md:flex flex-col w-80 bg-gray-800 p-2">
              <CardsChat />
            </div>
            <div className="w-full">
              <Button
                disabled={!selected.length}
                onClick={() => setShowSelect(!showSelect)}
              >
                Show Card
              </Button>
              {showSelect ? (
                <div className="flex flex-wrap">
                  {selected.map((i: string) => (
                    <FlipCard
                      key={lexis[+i].no}
                      front={lexis[+i].word}
                      end={lexis[+i].meaning}
                    />
                  ))}
                </div>
              ) : (
                <div className="container mx-auto py-10">
                  <DataTable
                    columns={columns}
                    data={lexis}
                    setSelected={setSelected}
                    selected={selected}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
