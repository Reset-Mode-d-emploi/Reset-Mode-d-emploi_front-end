import { rawGuides, GuideData } from './types';

function convertGuide(rawGuide: string[]) {
  const res: GuideData = {
    object: rawGuide[0] ? rawGuide[0] : '',
    ref: rawGuide[1] ? rawGuide[1] : '',
    part: rawGuide[2] ? rawGuide[2] : '',
    issue: rawGuide[3] ? rawGuide[3] : '',
    tutorials: rawGuide[4] ? rawGuide[4].split(';') : [''],
  };
  return res;
}

// eslint-disable-next-line import/prefer-default-export
export function convertGuides(guides: rawGuides | undefined) {
  if (!guides) return guides;
  // The first value is in fact the header of the dataset
  return guides.values.slice(1).map((guide: string[]) => convertGuide(guide));
}

export function getNextLink(
  nextStepText: string,
  object: string | undefined,
  part: string | undefined
) {
  if (!object) {
    return `#/guide/${nextStepText}`;
  }
  if (!part) {
    return `#/guide/${object}/${nextStepText}`;
  }
  return '#/map';
}

export function getNextStepTexts(
  guideData: GuideData[] | null,
  object: string | undefined,
  part: string | undefined
) {
  if (!object) {
    return Array.from(
      new Set(
        guideData?.map((guide) => {
          return guide.object;
        })
      )
    );
  }
  if (!part) {
    return Array.from(
      new Set(
        guideData
          ?.filter((guide) => guide.object === object)
          .map((guide) => {
            return guide.part;
          })
      )
    );
  }
  return Array.from(
    new Set(
      guideData
        ?.filter((guide) => guide.object === object && guide.part === part)
        .map((guide) => {
          return guide.issue;
        })
    )
  );
}
