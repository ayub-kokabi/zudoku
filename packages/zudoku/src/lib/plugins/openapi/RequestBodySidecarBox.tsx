import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button, useZudoku } from "zudoku/components";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "zudoku/ui/Collapsible.js";
import { getDirection, t } from "../../util/i18n.js";
import type { MediaTypeObject } from "./graphql/graphql.js";
import * as SidecarBox from "./SidecarBox.js";
import { SidecarExamples } from "./SidecarExamples.js";

export const RequestBodySidecarBox = ({
  content,
  onExampleChange,
  isOnScreen,
  shouldLazyHighlight,
  selectedContentIndex,
  selectedExampleIndex,
}: {
  content: MediaTypeObject[];
  onExampleChange?: (selected: {
    contentTypeIndex: number;
    exampleIndex: number;
  }) => void;
  isOnScreen: boolean;
  shouldLazyHighlight?: boolean;
  selectedContentIndex: number;
  selectedExampleIndex: number;
}) => {
  const { options } = useZudoku();
  const lang = options.site?.lang;
  const dir = getDirection(lang);

  if (content.length === 0) return null;

  return (
    <Collapsible className="group/collapsible" defaultOpen>
      <SidecarBox.Root>
        <SidecarBox.Head className="text-xs flex justify-between items-center">
          <span
            className="flex items-center gap-1 font-medium me-auto"
            dir={dir}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="size-fit px-1 py-1 -my-1"
                aria-label="Toggle request body examples"
              >
                <ChevronsDownUpIcon className="size-[1em] group-data-[state=closed]/collapsible:hidden" />
                <ChevronsUpDownIcon className="size-[1em] group-data-[state=open]/collapsible:hidden" />
              </Button>
            </CollapsibleTrigger>
            {t(lang, "requestBody.example", "Example Request Body")}
          </span>
        </SidecarBox.Head>
        <CollapsibleContent>
          <SidecarExamples
            selectedContentIndex={selectedContentIndex}
            selectedExampleIndex={selectedExampleIndex}
            content={content}
            onExampleChange={onExampleChange}
            isOnScreen={isOnScreen}
            shouldLazyHighlight={shouldLazyHighlight}
          />
        </CollapsibleContent>
      </SidecarBox.Root>
    </Collapsible>
  );
};
