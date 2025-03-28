import { build, perBuild, Builder } from "@jackfranklin/test-data-bot"
import jwt from "jsonwebtoken"
import { faker } from "@faker-js/faker"
import generateOid from "../shared/utils/generateOid"
import generateJoinCode from "../shared/utils/generateJoinCode"
import randomId from "../shared/utils/randomId"
import crypto from "crypto"
import {
  DbUser,
  DbQuestion,
  DbVariable,
  DbCondition,
  DbBank,
  DbActivity,
  DbActivityQuestion,
  DbActivitySection,
  UserRole,
  VariableType,
  QuestionType,
  DbActivityResponse,
  DbActivityResponseVariable,
  DbActivityResponseResponse,
} from "./types"

faker.seed(123)

type BuilderResult =
  | "user"
  | "question"
  | "bank"
  | "activity"
  | "activityresponse"

const variableBuilder: Builder<DbVariable> = build({
  fields: {
    id: perBuild(() => randomId()),
    label: perBuild(() => faker.lorem.word()),
    type: "random" as VariableType,
    min: perBuild(() => faker.number.int({ min: 10, max: 100 })),
    max: perBuild(() => faker.number.int({ min: 101, max: 200 })),
    step: perBuild(() => faker.number.int({ min: 1, max: 5 })),
  },
})

const conditionBuilder: Builder<DbCondition> = build({
  fields: {
    id: perBuild(() => randomId()),
    expression: perBuild(() => faker.lorem.word()),
    isCorrect: true,
    feedback: perBuild(() => faker.lorem.sentence()),
  },
})

const activityBuilder: Builder<DbActivity> = build({
  fields: {
    _id: perBuild(() => generateOid()),
    name: perBuild(() => faker.lorem.sentence(5)),
    owner: perBuild(() => generateOid()),
    sections: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        sectionBuilder(),
      ),
    ),
    code: perBuild(() => generateJoinCode()),
    isArchived: false,
    tags: perBuild(() => Array.from({ length: 5 }, () => faker.lorem.word())),
    questionCount: 0,
  },
  postBuild: (activity) => {
    let sectionIndex = 0
    activity.questionCount = activity.sections.reduce(
      (sum, section) => sum + section.questions.length,
      0,
    )
    activity.sections.forEach((section) => {
      section.sectionIndex = sectionIndex
      sectionIndex++
    })
    return activity
  },
})

const sectionBuilder: Builder<DbActivitySection> = build({
  fields: {
    id: perBuild(() => generateOid().toHexString()),
    name: perBuild(() => faker.lorem.sentence(5)),
    questions: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        activityQuestionBuilder(),
      ),
    ),
    summary: perBuild(() => faker.lorem.sentence(5)),
    sectionIndex: 0,
  },
})

const activityQuestionBuilder: Builder<DbActivityQuestion> = build({
  fields: {
    id: perBuild(() => generateOid().toHexString()),
    parent: perBuild(() => generateOid()),
    prompt: perBuild(() => faker.lorem.sentence(5)),
    variables: perBuild(() =>
      Array.from({ length: 5 }, () => variableBuilder()),
    ),
    conditions: perBuild(() =>
      Array.from({ length: 5 }, () => conditionBuilder()),
    ),
    pointValue: perBuild(() => faker.number.int({ min: 10, max: 100 })),
    type: "numerical" as QuestionType,
  },
})

const activityResponseBuilder: Builder<DbActivityResponse> = build({
  fields: {
    _id: perBuild(() => generateOid()),
    activity: perBuild(() => generateOid()),
    teacher: perBuild(() => generateOid()),
    student: perBuild(() => faker.lorem.word()),
    variables: perBuild(() => [] as DbActivityResponseVariable[]),
    responses: perBuild(() => [] as DbActivityResponseResponse[]),
    totalScore: perBuild(() => faker.number.int({ min: 1, max: 20 })),
    activityCode: perBuild(() => generateJoinCode()),
  },
})

const activityResponseVariableBuilder: Builder<DbActivityResponseVariable> =
  build({
    fields: {
      id: perBuild(() => Math.random().toString(36).substring(2, 15)),
      value: perBuild(() => faker.number.int({ min: 1, max: 50 })),
      label: perBuild(() => faker.lorem.word()),
    },
  })

const activityResponseResponseBuilder: Builder<DbActivityResponseResponse> =
  build({
    fields: {
      question: perBuild(() => generateOid()),
      content: perBuild(() => faker.number.int({ min: 1, max: 100 })),
      score: perBuild(() => faker.number.int({ min: 1, max: 20 })),
      isCorrect: perBuild(() => {
        return faker.number.int({ min: 1, max: 100 }) % 2 === 0
          ? faker.number.int({ min: 1, max: 100 }) % 2 === 0
          : null
      }),
    },
  })

const bankBuilder: Builder<DbBank> = build({
  fields: {
    _id: perBuild(() => generateOid()),
    name: perBuild(() => faker.lorem.sentence()),
    owner: perBuild(() => generateOid()),
    description: perBuild(() => faker.lorem.sentence()),
    questions: perBuild(() => [generateOid()]),
    isArchived: false,
    isDeleted: false,
  },
})

const studentBuilder: Builder<DbUser> = build({
  fields: {
    _id: perBuild(() => generateOid()),
    firstName: perBuild(() => faker.person.firstName()),
    lastName: perBuild(() => faker.person.lastName()),
    email: perBuild(() => faker.internet.email().toLowerCase()),
    hash: "$2b$10$2Qt1dVjd.mH/t6h..Xv.JOkuFZ6Pn6kVUimXjDTZl84vYlF8JtNYW",
    role: "student" as UserRole,
  },
})

const teacherBuilder: Builder<DbUser> = build({
  fields: {
    _id: perBuild(() => generateOid()),
    firstName: perBuild(() => faker.person.firstName()),
    lastName: perBuild(() => faker.person.lastName()),
    email: perBuild(() => faker.internet.email().toLowerCase()),
    hash: "$2b$10$2Qt1dVjd.mH/t6h..Xv.JOkuFZ6Pn6kVUimXjDTZl84vYlF8JtNYW",
    role: "teacher" as UserRole,
  },
})

const questionBuilder: Builder<DbQuestion> = build({
  fields: {
    _id: perBuild(() => generateOid()),
    prompt: perBuild(() => faker.lorem.sentence(5)),
    variables: perBuild(() =>
      Array.from({ length: 5 }, () => variableBuilder()),
    ),
    conditions: perBuild(() =>
      Array.from({ length: 5 }, () => conditionBuilder()),
    ),
    pointValue: perBuild(() => faker.number.int({ min: 10, max: 100 })),
    type: "numerical" as QuestionType,
    owner: perBuild(() => generateOid()),
    isArchived: false,
    isDeleted: false,
  },
})

function applyOverrides<T>(builderInstance: T, overrides: any = {}) {
  for (const key in overrides) {
    //eslint-disable-next-line
    if (overrides.hasOwnProperty(key)) {
      ;(builderInstance as Record<string, any>)[key] = overrides[key]
    }
  }
}

function createBuilderMethod<T>(
  entityBuilder: Builder<T>,
  builderClassInstance: DbBuilder,
  type: BuilderResult,
) {
  return function (overrides = {}) {
    const builderResult: T = entityBuilder.one(overrides)
    applyOverrides(builderResult, overrides)
    switch (type) {
      case "user":
        builderClassInstance.data.users.push(builderResult as DbUser)
        break
      case "bank":
        builderClassInstance.data.banks.push(builderResult as DbBank)
        break
      case "question":
        builderClassInstance.data.questions.push(builderResult as DbQuestion)
        break
      case "activity":
        builderClassInstance.data.activities.push(builderResult as DbActivity)
        break
      case "activityresponse":
        builderClassInstance.data.activityresponses.push(
          builderResult as DbActivityResponse,
        )
        break
    }
    return builderResult
  }
}

function createComponentBuilderMethod<T>(entityBuilder: Builder<T>) {
  return function (overrides = {}) {
    const builderResult: T = entityBuilder.one(overrides)
    applyOverrides(builderResult, overrides)
    return builderResult
  }
}

class DbBuilder {
  readonly data: {
    users: DbUser[]
    questions: DbQuestion[]
    banks: DbBank[]
    activities: DbActivity[]
    activityresponses: DbActivityResponse[]
  }
  readonly faker
  readonly user
  readonly question
  readonly bank
  readonly activity
  readonly activityresponses
  constructor() {
    this.data = {
      users: [],
      questions: [],
      banks: [],
      activities: [],
      activityresponses: [],
    }
    this.faker = faker
    this.user = {
      student: createBuilderMethod<DbUser>(studentBuilder, this, "user"),
      teacher: createBuilderMethod<DbUser>(teacherBuilder, this, "user"),
    }
    this.question = Object.assign(
      createBuilderMethod<DbQuestion>(questionBuilder, this, "question"),
      {
        variable: createComponentBuilderMethod<DbVariable>(variableBuilder),
        condition: createComponentBuilderMethod<DbCondition>(conditionBuilder),
      },
    )
    this.bank = createBuilderMethod<DbBank>(bankBuilder, this, "bank")
    this.activity = Object.assign(
      createBuilderMethod<DbActivity>(activityBuilder, this, "activity"),
      {
        section:
          createComponentBuilderMethod<DbActivitySection>(sectionBuilder),
        question: createComponentBuilderMethod<DbActivityQuestion>(
          activityQuestionBuilder,
        ),
      },
    )
    this.activityresponses = Object.assign(
      createBuilderMethod<DbActivityResponse>(
        activityResponseBuilder,
        this,
        "activity",
      ),
      {
        variable: createComponentBuilderMethod<DbActivityResponseVariable>(
          activityResponseVariableBuilder,
        ),
        response: createComponentBuilderMethod<DbActivityResponseResponse>(
          activityResponseResponseBuilder,
        ),
      },
    )
  }
  randomId() {
    return generateOid()
  }
  token(user: DbUser) {
    return jwt.sign({ id: user._id, role: user.role }, "jwt_secret")
  }
  seed() {
    return {
      users: this.data.users,
      questions: this.data.questions,
      banks: this.data.banks,
      activities: this.data.activities,
    }
  }
}

const builder = new DbBuilder()
export default builder
