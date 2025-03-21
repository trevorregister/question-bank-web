import { build, perBuild, Builder } from "@jackfranklin/test-data-bot"
import jwt from "jsonwebtoken"
import { faker } from "@faker-js/faker"
import generateOid from "../shared/utils/generateOid"
import randomId from "../shared/utils/randomId"
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
} from "./types"

faker.seed(123)

/* const assignmentResponseBuilder = build({
  fields: {
    _id: perBuild(() => generateOid()),
    assignment: perBuild(() => generateOid()),
    owner: perBuild(() => generateOid()),
    variables: [],
    responses: [],
    totalScore: 0,
  },
}) */

type BuilderResult = "user" | "question" | "bank" | "activity"

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

/* const assignmentBuilder = build({
  fields: {
    _id: perBuild(() => generateOid()),
    class: perBuild(() => generateOid()),
    activity: perBuild(() => generateOid()),
    owner: perBuild(() => generateOid()),
    startDate: perBuild(() => faker.date.soon()),
    dueDate: perBuild(() => faker.date.soon()),
  },
})

const classBuilder = build({
  fields: {
    _id: perBuild(() => generateOid()),
    name: perBuild(() => faker.lorem.sentence()),
    owner: perBuild(() => generateOid()),
    joinCode: perBuild(() => faker.lorem.word(6)),
    roster: [],
    droppedStudents: [],
    isArchived: false,
  },
})

const rosteredStudentBuilder = build({
  fields: {
    student: perBuild(() => generateOid()),
    joinDate: perBuild(() => new Date()),
  },
})

const droppedStudentBuilder = build({
  fields: {
    student: perBuild(() => generateOid()),
    dropDate: perBuild(() => new Date()),
  },
})
 */

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
  }
  readonly faker
  readonly user
  readonly question
  readonly bank
  readonly activity
  constructor() {
    this.data = {
      users: [],
      questions: [],
      banks: [],
      activities: [],
      /* classes: [],
      assignments: [],
      assignmentResponses: [], */
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
    /*     this.activity = Object.assign(
      createBuilderMethod(activityBuilder, ActivityModel, this),
      {
        section: createComponentBuilderMethod(sectionBuilder),
      },
    )
    this.class = Object.assign(
      createBuilderMethod(classBuilder, ClassModel, this),
      {
        rosteredStudent: createComponentBuilderMethod(rosteredStudentBuilder),
        droppedStudent: createComponentBuilderMethod(droppedStudentBuilder),
      },
    )
    this.assignment = createBuilderMethod(
      assignmentBuilder,
      AssignmentModel,
      this,
    )
    this.assignmentResponse = createBuilderMethod(
      assignmentResponseBuilder,
      AssignmentResponseModel,
      this,
    ) */
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
