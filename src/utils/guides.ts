import {
  GIVE_OPTION,
  GIVE_OR_REPAIR_QUESTION,
  ISSUE_QUESTION,
  OBJECT_QUESTION,
  PART_QUESTION,
  REPAIR_OPTION,
} from './constants';
import { GuideData } from './types';

export function getQuestion(
  object: string | undefined,
  giveOrRepair: string | undefined,
  part: string | undefined
) {
  if (!object) {
    return OBJECT_QUESTION;
  }
  if (!giveOrRepair) {
    return GIVE_OR_REPAIR_QUESTION;
  }
  if (!part) {
    return PART_QUESTION;
  }
  return ISSUE_QUESTION;
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

function hasTutorials(guideData: Partial<GuideData>[] | null, object: string) {
  if (!guideData) {
    return false;
  }
  return (
    guideData?.filter(
      (guide) =>
        guide.object === object && guide.tutorials && guide.tutorials[0] !== ''
    ).length > 0
  );
}

export function getNextLink(
  nextStepText: string,
  object: string | undefined,
  giveOrRepair: string | undefined,
  part: string | undefined,
  guideData: Partial<GuideData>[] | null
) {
  if (!object) {
    if (hasTutorials(guideData, nextStepText)) {
      return `#/guide/${nextStepText}`;
    }
    return `#/map/${GIVE_OPTION}/${getRef(guideData, nextStepText)}`;
  }
  if (!giveOrRepair) {
    if (nextStepText === GIVE_OPTION) {
      return `#/map/${GIVE_OPTION}/${getRef(guideData, object)}`;
    }
    return `#/guide/${object}/${nextStepText}`;
  }
  if (!part) {
    return `#/guide/${object}/${giveOrRepair}/${nextStepText}`;
  }
  return `#/guide/${object}/${giveOrRepair}/${part}/${nextStepText}`;
}

export function getNextStepTexts(
  guideData: Partial<GuideData>[] | null,
  object: string | undefined,
  giveOrRepair: string | undefined,
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
  if (!giveOrRepair) {
    return [GIVE_OPTION, REPAIR_OPTION];
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

export function getTutorials(
  guideData: Partial<GuideData>[] | null,
  object: string | undefined,
  part: string | undefined,
  issue: string | undefined
) {
  if (!object || !part || !issue) {
    return null;
  }
  return guideData?.filter(
    (guide) =>
      guide.object === object && guide.part === part && guide.issue === issue
  )[0].tutorials;
}
