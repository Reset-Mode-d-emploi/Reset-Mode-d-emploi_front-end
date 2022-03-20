import { GuideData } from './types';

export function getNextLink(
  nextStepText: string,
  object: string | undefined,
  part: string | undefined,
  ref: string | undefined
) {
  if (!object) {
    return `#/guide/${nextStepText}`;
  }
  if (!part) {
    return `#/guide/${object}/${nextStepText}`;
  }
  return `#/map/${ref}`;
}

export function getNextStepTexts(
  guideData: Partial<GuideData>[] | null,
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

export function getRef(
  guideData: Partial<GuideData>[] | null,
  object: string | undefined
) {
  if (!object) {
    console.error('No object');
    return '';
  }
  return guideData?.filter((guide) => guide.object === object)[0].ref;
}
