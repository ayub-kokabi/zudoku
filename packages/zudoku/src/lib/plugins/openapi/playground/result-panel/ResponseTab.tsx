import { useQuery } from "@tanstack/react-query";
import {
  CornerDownLeftIcon,
  CornerDownRightIcon,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  SquareCodeIcon,
} from "lucide-react";
import { useState } from "react";
import { useZudoku } from "zudoku/components";
import { Button } from "zudoku/ui/Button.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "zudoku/ui/Collapsible.js";
import { SecretText } from "zudoku/ui/Secret.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "zudoku/ui/Select.js";
import { SyntaxHighlight } from "zudoku/ui/SyntaxHighlight.js";
import { cn } from "../../../../util/cn.js";
import createVariantComponent from "../../../../util/createVariantComponent.js";
import { humanFileSize } from "../../../../util/humanFileSize.js";
import { getDirection, t } from "../../../../util/i18n.js";
import {
  CollapsibleHeader,
  CollapsibleHeaderTrigger,
} from "../CollapsibleHeader.js";
import { isAudioContentType } from "../fileUtils.js";
import { AudioPlayer } from "./AudioPlayer.js";
import { convertToTypes } from "./convertToTypes.js";

const mimeTypeToLanguage = (mimeType: string) => {
  const mimeTypeMapping = {
    "application/json": "json",
    "text/json": "json",
    "text/html": "html",
    "text/css": "css",
    "text/javascript": "javascript",
    "application/xml": "xml",
    "application/xhtml+xml": "xhtml",
  };

  return Object.entries(mimeTypeMapping).find(([mime]) =>
    mimeType.includes(mime),
  )?.[1];
};

const getContentType = (headers: Array<[string, string]>) => {
  return (
    headers.find(([key]) => key.toLowerCase() === "content-type")?.[1] || ""
  );
};

const detectLanguage = (headers: Array<[string, string]>) => {
  const contentType = getContentType(headers);
  return mimeTypeToLanguage(contentType);
};

const tryParseJson = (body: string) => {
  try {
    return JSON.stringify(JSON.parse(body), null, 2);
  } catch {
    return null;
  }
};

const sortHeadersByRelevance = (
  headers: Array<[string, string]>,
): Array<[string, string]> => {
  const priorityOrder = [
    "Content-Type",
    "Content-Length",
    "Authorization",
    "X-RateLimit-Remaining",
    "X-RateLimit-Limit",
    "Cache-Control",
    "ETag",
  ].map((key) => key.toLowerCase());

  return [...headers].sort(([keyA], [keyB]) => {
    const indexA = priorityOrder.indexOf(keyA.toLowerCase());
    const indexB = priorityOrder.indexOf(keyB.toLowerCase());
    if (indexA === indexB) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

const MAX_HEADERS_TO_SHOW = 3;

const Row = createVariantComponent(
  "div",
  "grid-cols-subgrid grid border-b col-span-full px-4 py-1.5 font-mono text-xs",
);

const RowContent = createVariantComponent("div", "py-1 break-words");
const RowValue = ({ value, header }: { value: string; header: string }) => {
  const secretHeaders = ["authorization", "key", "secret", "token"];
  const isSecret = secretHeaders.includes(header.toLowerCase());
  const [revealed, setRevealed] = useState(!isSecret);
  return (
    <RowContent
      className={cn(
        "max-h-28 overflow-auto",
        isSecret && "cursor-pointer flex group",
      )}
      onClick={() => {
        if (isSecret) {
          setRevealed((prev) => !prev);
        }
      }}
    >
      {!isSecret ? (
        value
      ) : (
        <>
          <SecretText secret={value} previewChars={0} revealed={revealed} />
          {revealed ? (
            <EyeOffIcon
              size={14}
              className={cn("hidden group-hover:block")}
              aria-hidden="true"
            />
          ) : (
            <EyeIcon
              size={14}
              className={cn("hidden group-hover:block")}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </RowContent>
  );
};

export const ResponseTab = ({
  body = "",
  headers,
  request,
  size,
  isBinary = false,
  fileName,
  blob,
}: {
  body?: string;
  headers: Array<[string, string]>;
  request: {
    method: string;
    url: string;
    headers: Array<[string, string]>;
    body?: string;
  };
  size: number;
  isBinary?: boolean;
  fileName?: string;
  blob?: Blob;
}) => {
  const { options } = useZudoku();
  const lang = options.site?.lang;
  const dir = getDirection(lang);

  const detectedLanguage = detectLanguage(headers);
  const jsonContent = tryParseJson(body);
  const beautifiedBody = jsonContent || body;
  const [view, setView] = useState<"formatted" | "raw" | "types">(
    jsonContent ? "formatted" : "raw",
  );

  const types = useQuery({
    queryKey: ["types", beautifiedBody],
    queryFn: async () => convertToTypes(JSON.parse(beautifiedBody)),
    enabled: view === "types" && !isBinary,
  });

  const handleDownload = () => {
    if (blob && fileName) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const sortedHeaders = sortHeadersByRelevance([...headers]);

  const renderHeaderToggle = (count: number, isShow: boolean) => (
    <CollapsibleTrigger className="justify-center col-span-2 text-xs text-muted-foreground hover:text-primary border-b h-8 flex items-center gap-2">
      {isShow
        ? t(
            lang,
            "playground.resultPanel.showMore",
            `Show ${count} more headers`,
          ).replace("{count}", String(count))
        : t(lang, "playground.resultPanel.hideHeaders", "Hide headers")}
      {isShow ? <PlusCircleIcon size={12} /> : <MinusCircleIcon size={12} />}
    </CollapsibleTrigger>
  );

  return (
    <div dir={dir}>
      {/* بخش Request Headers */}
      <Collapsible defaultOpen>
        <CollapsibleHeaderTrigger>
          <CornerDownRightIcon size={14} className="rtl:rotate-90" />
          <CollapsibleHeader>
            {t(
              lang,
              "playground.resultPanel.requestHeaders",
              "Request Headers",
            )}
          </CollapsibleHeader>
        </CollapsibleHeaderTrigger>
        <CollapsibleContent dir="ltr">
          {" "}
          {/* هدرها همیشه LTR باشند */}
          <div className="grid grid-cols-[2fr_3fr] gap-x-6 text-sm">
            {request.headers
              .slice(0, MAX_HEADERS_TO_SHOW)
              .map(([key, value]) => (
                <Row key={key}>
                  <RowContent>{key}</RowContent>
                  <RowValue value={value} header={key} />
                </Row>
              ))}
            {request.headers.length > MAX_HEADERS_TO_SHOW && (
              <Collapsible className="col-span-full grid-cols-subgrid grid group">
                <CollapsibleContent className="col-span-full grid grid-cols-subgrid">
                  {request.headers
                    .slice(MAX_HEADERS_TO_SHOW)
                    .map(([key, value]) => (
                      <Row key={key}>
                        <RowContent>{key}</RowContent>
                        <RowValue value={value} header={key} />
                      </Row>
                    ))}
                </CollapsibleContent>
                {renderHeaderToggle(
                  request.headers.length - MAX_HEADERS_TO_SHOW,
                  true,
                )}
                <div className="group-data-[state=closed]:hidden contents">
                  {renderHeaderToggle(0, false)}
                </div>
              </Collapsible>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleHeaderTrigger>
          <CornerDownLeftIcon size={14} className="rtl:-rotate-90" />
          <CollapsibleHeader>
            {t(
              lang,
              "playground.resultPanel.responseHeaders",
              "Response Headers",
            )}
          </CollapsibleHeader>
        </CollapsibleHeaderTrigger>
        <CollapsibleContent dir="ltr">
          <div className="grid grid-cols-[2fr_3fr] gap-x-6 text-sm">
            {sortedHeaders.slice(0, MAX_HEADERS_TO_SHOW).map(([key, value]) => (
              <Row key={key}>
                <RowContent>{key}</RowContent>
                <RowValue value={value} header={key} />
              </Row>
            ))}
            {sortedHeaders.length > MAX_HEADERS_TO_SHOW && (
              <Collapsible className="col-span-full grid-cols-subgrid grid group">
                <CollapsibleContent className="col-span-full grid grid-cols-subgrid">
                  {sortedHeaders
                    .slice(MAX_HEADERS_TO_SHOW)
                    .map(([key, value]) => (
                      <Row key={key}>
                        <RowContent>{key}</RowContent>
                        <RowValue value={value} header={key} />
                      </Row>
                    ))}
                </CollapsibleContent>
                {renderHeaderToggle(
                  sortedHeaders.length - MAX_HEADERS_TO_SHOW,
                  true,
                )}
                <div className="group-data-[state=closed]:hidden contents">
                  {renderHeaderToggle(0, false)}
                </div>
              </Collapsible>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex gap-2 justify-between items-center border-b px-2 flex-0">
        <CollapsibleHeader className="flex items-center gap-2">
          <SquareCodeIcon size={14} />
          {t(lang, "playground.resultPanel.responseBody", "Response Body")}
        </CollapsibleHeader>
        {jsonContent && !isBinary && (
          <Select
            value={view}
            onValueChange={(v: "formatted" | "raw" | "types") => setView(v)}
          >
            <SelectTrigger
              className="max-w-40 border-0 bg-transparent"
              dir={dir}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent dir={dir}>
              <SelectItem value="formatted">
                {t(lang, "playground.resultPanel.view.formatted", "Formatted")}
              </SelectItem>
              <SelectItem value="raw">
                {t(lang, "playground.resultPanel.view.raw", "Raw")}
              </SelectItem>
              <SelectItem value="types">
                {t(lang, "playground.resultPanel.view.types", "Types")}
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex-1" dir="ltr">
        {isBinary ? (
          blob && isAudioContentType(getContentType(headers)) ? (
            <AudioPlayer
              blob={blob}
              fileName={
                fileName ?? t(lang, "playground.resultPanel.audio", "audio")
              }
              size={size}
              onDownload={handleDownload}
            />
          ) : (
            <div className="p-4 text-center" dir={dir}>
              <div className="flex flex-col items-center gap-4">
                <div className="text-lg font-semibold">
                  {t(
                    lang,
                    "playground.resultPanel.binaryTitle",
                    "Binary Content",
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t(
                    lang,
                    "playground.resultPanel.binaryContent",
                    "This response contains binary data...",
                  )}
                </div>
                <Button
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <DownloadIcon className="h-4 w-4" />
                  {t(
                    lang,
                    "playground.resultPanel.downloadFile",
                    "Download file",
                  )
                    .replace("{fileName}", fileName || "file")
                    .replace("{size}", humanFileSize(size))}
                </Button>
              </div>
            </div>
          )
        ) : (
          <SyntaxHighlight
            className="text-xs flex-1"
            embedded
            fullHeight
            language={
              view === "types"
                ? "typescript"
                : view === "raw" && !jsonContent
                  ? detectedLanguage
                  : "json"
            }
            code={
              (view === "raw"
                ? body
                : view === "types"
                  ? types.data?.lines.join("\n")
                  : beautifiedBody) ?? ""
            }
          />
        )}
      </div>
    </div>
  );
};
