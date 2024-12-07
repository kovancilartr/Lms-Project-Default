import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/tr";

const prisma = new PrismaClient();

async function main() {
  // Admin
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const admins = await Promise.all(
    Array.from({ length: 2 }, () =>
      prisma.admin.create({
        data: {
          id: faker.string.uuid(),
          username: faker.internet.username(),
        },
      })
    )
  );

  // Teacher
  const teachers = await Promise.all(
    Array.from({ length: 5 }, () =>
      prisma.teacher.create({
        data: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          username: faker.internet.username(),
          phone: faker.phone.number(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          address: faker.location.streetAddress(),
          img: faker.image.avatar(),
          sex: faker.helpers.arrayElement(["MALE", "FEMALE"]),
          birthday: faker.date.birthdate({ min: 30, max: 50, mode: "age" }),
        },
      })
    )
  );

  // Courses
  const courses = await Promise.all(
    Array.from({ length: 5 }, (_, index) =>
      prisma.courses.create({
        data: {
          name: `Course ${index + 1}`,
          description: faker.lorem.sentences(2),
          courseUrl: faker.internet.url(),
          previewImage: faker.image.urlLoremFlickr({ category: "education" }),
          previewVideo: faker.internet.url(),
          supervisorId: teachers[faker.number.int({ min: 0, max: 4 })].id,
          startTime: faker.date.future(),
          endTime: faker.date.future(),
        },
      })
    )
  );

  // Lessons
  const lessons = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    courses.flatMap((course) =>
      Array.from({ length: 5 }, () =>
        prisma.lessons.create({
          data: {
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            description: faker.lorem.sentences(2),
            previewImage: faker.image.urlLoremFlickr({ category: "education" }),
            videoUrl: faker.internet.url(),
            pdfUrl: faker.internet.url(),
            day: faker.helpers.arrayElement([
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
            ]),
            startTime: faker.date.future(),
            endTime: faker.date.future(),
          },
        })
      )
    )
  );

  // Associate lessons with courses
  for (const course of courses) {
    const courseLessons = lessons.filter((lesson) =>
      lesson.id.includes(course.id.toString())
    );
    await prisma.courses.update({
      where: { id: course.id },
      data: {
        lessons: {
          connect: courseLessons.map((lesson) => ({ id: lesson.id })),
        },
      },
    });
  }

  // Students
  const students = await Promise.all(
    Array.from({ length: 5 }, () =>
      prisma.student.create({
        data: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          username: faker.internet.username(),
          phone: faker.phone.number(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          address: faker.location.streetAddress(),
          sex: faker.helpers.arrayElement(["MALE", "FEMALE"]),
          birthday: faker.date.birthdate({ min: 18, max: 25, mode: "age" }),
        },
      })
    )
  );

  // Associate students with courses
  for (const student of students) {
    const studentCourses = courses.slice(
      0,
      faker.number.int({ min: 1, max: 3 })
    ); // Her öğrenciye 1 ila 3 kurs
    for (const course of studentCourses) {
      await prisma.studentCourses.create({
        data: {
          studentId: student.id,
          courseId: course.id,
        },
      });
    }
  }

  // Associate students with lessons (Ensuring no duplicates)
  for (const student of students) {
    const enrolledCourses = await prisma.studentCourses.findMany({
      where: { studentId: student.id },
    });
    const enrolledLessons = await Promise.all(
      enrolledCourses.map(async (course) => {
        return await prisma.lessons.findMany({
          where: { Courses: { some: { id: course.courseId } } },
        });
      })
    ).then((lessonsArray) => lessonsArray.flat());

    for (const lesson of enrolledLessons) {
      const existingEnrollment = await prisma.studentLessons.findFirst({
        where: {
          studentId: student.id,
          lessonId: lesson.id,
        },
      });

      if (!existingEnrollment) {
        await prisma.studentLessons.create({
          data: {
            studentId: student.id,
            lessonId: lesson.id,
            lessonCompletion: faker.datatype.boolean(),
          },
        });
      }
    }
  }

  // Exams and Questions
  for (const lesson of lessons) {
    const exam = await prisma.exam.create({
      data: {
        title: `${lesson.name} Exam`,
        description: `Exam for ${lesson.name}`,
        lessonId: lesson.id,
        coursesId:
          courses.find(
            (course) => course.id.toString() === lesson.id.toString()
          )?.id || null,
      },
    });

    // Create questions for each exam
    const numberOfQuestions = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < numberOfQuestions; i++) {
      await prisma.question.create({
        data: {
          text: faker.lorem.sentence(),
          options: [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
          ], // 4 random options
          answer: faker.number.int({ min: 0, max: 3 }).toString(), // Random correct answer index
          examId: exam.id,
        },
      });
    }
  }

  // Exam Results
  for (const student of students) {
    const studentExams = await prisma.exam.findMany({
      where: {
        lessonId: {
          in: (
            await prisma.studentLessons.findMany({
              where: { studentId: student.id },
              select: { lessonId: true },
            })
          ).map((enrollment) => enrollment.lessonId),
        },
      },
    });

    for (const exam of studentExams) {
      const score = faker.number.int({ min: 0, max: 100 });
      await prisma.examResult.create({
        data: {
          studentId: student.id,
          examId: exam.id,
          score: score,
        },
      });
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
