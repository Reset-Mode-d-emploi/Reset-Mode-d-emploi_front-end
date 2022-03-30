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

export function getNextLink(
  nextStepText: string,
  object: string | undefined,
  giveOrRepair: string | undefined,
  part: string | undefined,
  ref: string | undefined
) {
  if (!object) {
    return `#/guide/${nextStepText}`;
  }
  if (!giveOrRepair) {
    if (nextStepText === GIVE_OPTION) {
      return `#/map/${GIVE_OPTION}/${ref}`;
    }
    return `#/guide/${object}/${nextStepText}`;
  }
  if (!part) {
    return `#/guide/${object}/${giveOrRepair}/${nextStepText}`;
  }
  return `#/map/${giveOrRepair}/${ref}`;
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
