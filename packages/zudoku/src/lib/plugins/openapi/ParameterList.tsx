import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Fragment } from "react";
import { useZudoku } from "../../components/context/ZudokuContext.js";
import { Heading } from "../../components/Heading.js";
import { Frame, FramePanel } from "../../ui/Frame.js";
import { ItemGroup, ItemSeparator } from "../../ui/Item.js";
import { getDirection, t } from "../../util/i18n.js";
import type { ParameterItem } from "./graphql/graphql.js";
import type { ParameterGroup } from "./OperationListItem.js";
import { ParameterListItem } from "./ParameterListItem.js";

export const ParameterList = ({
  summary,
  group,
  parameters,
  id,
}: {
  summary?: string;
  group: ParameterGroup;
  parameters: ParameterItem[];
  id: string;
}) => {
  const { options } = useZudoku();
  const lang = options.site?.lang;
  const dir = getDirection(lang);

  const sortedParameters = parameters.sort((a, b) =>
    a.required === b.required ? 0 : a.required ? -1 : 1,
  );
  const getGroupLabel = (group: string) => {
    switch (group) {
      case "query":
        return t(lang, "openApi.parameters.query", "Query Parameters");
      case "header":
        return t(lang, "openApi.parameters.header", "Headers");
      case "path":
        return t(lang, "openApi.parameters.path", "Path Parameters");
      case "cookie":
        return t(lang, "openApi.parameters.cookie", "Cookie Parameters");
      default:
        return `${group} Parameters`;
    }
  };

  return (
    <>
      <Heading
        level={3}
        id={`${id}/${group}-parameters`}
        className="capitalize"
        dir={dir}
      >
        {summary && <VisuallyHidden>{summary} &rsaquo; </VisuallyHidden>}

        {getGroupLabel(group)}
      </Heading>
      <Frame dir={dir}>
        <FramePanel className="p-0!">
          <ItemGroup className="overflow-clip">
            {sortedParameters.map((parameter, index) => (
              <Fragment key={`${parameter.name}-${parameter.in}`}>
                {index > 0 && <ItemSeparator />}
                <ParameterListItem
                  parameter={parameter}
                  id={id}
                  group={group}
                />
              </Fragment>
            ))}
          </ItemGroup>
        </FramePanel>
      </Frame>
    </>
  );
};
