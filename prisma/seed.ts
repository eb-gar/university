import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
   await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const permissionsData = [
  { name: 'manage_assignments', description: 'Gestionar tareas' }, // assignments
  { name: 'view_assignments', description: 'Ver tareas' }, // assignments
  { name: 'manage_assignments', description: 'Gestionar tareas/Id' }, // assignments
  { name: 'delete_assignments', description: 'Eliminar tareas/Id' }, // assignments

  { name: 'manage_careers', description: 'Gestionar carreras' }, //careers
  { name: 'view_careers', description: 'Ver carreras' }, //careers
  { name: 'view_students', description: 'Ver estudiantes' }, //careers
  { name: 'view_teachers', description: 'Ver docentes' },// careers
  { name: 'manage_careers', description: 'Gestionar carreras/Id' }, // careers
  { name: 'delete_careers', description: 'Eliminar carreras/Id' }, // careers

  { name: 'manage_course_records', description: 'Gestionar registros de cursos' }, // course_records
  { name: 'view_course_records', description: 'Ver registros de cursos' }, // course_records
  { name: 'view_course_records', description: 'Ver registros de cursos/Id' }, // course_records
  { name: 'manage_course_records', description: 'Editar registros de cursos/Id' }, // course_records
  { name: 'delete_course_records', description: 'Eliminar registros de cursos/Id' }, // course_records

  { name: 'manage_enrollments', description: 'Gestionar inscripciones' }, // enrollment
  { name: 'view_enrollments', description: 'Ver inscripciones' }, // enrollment
  { name: 'edit enrollments', description: 'Editar inscripciones/Id' }, // enrollment
  { name: 'delete_enrollments', description: 'Eliminar inscripciones/Id' }, // enrollment

  { name: 'manage_registrations', description: 'Gestionar inscripciones' }, // registration
  { name: 'view_registrations', description: 'Ver inscripciones' }, // registration
  { name: 'manage_registrations', description: 'Editar inscripciones/Id' }, // registration
  { name: 'delete_registrations', description: 'Eliminar inscripciones/Id' }, // registration

  { name: 'manage_courses', description: 'Gestionar cursos' }, // courses
  { name: 'view_courses', description: 'Ver cursos' }, // courses
  { name: 'create_courses', description: 'Crear cursos' }, // courses
  { name: 'edit_courses', description: 'Editar cursos/Id' }, // courses
  { name: 'delete_courses', description: 'Eliminar cursos/Id' }, // courses

  { name: 'manage_students', description: 'Gestionar estudiantes' }, // students
  { name: 'view_students', description: 'Ver estudiantes' }, // students
  { name: 'view_student_data', description: 'Ver datos de estudiantes/Id' }, // students
  { name: 'manage_students', description: 'Editar estudiantes/Id' }, // students
  { name: 'delete_students', description: 'Eliminar estudiantes/Id' }, // students

  { name: 'manage_subjects', description: 'Gestionar materias' }, // subjects
  { name: 'view_subjects', description: 'Ver materias' }, // subjects
  { name: 'view_subject_students', description: 'Ver estudiantes de materias/Id' }, // subjects
  { name: 'view_subject_teachers', description: 'Ver docentes de materias/Id' }, // subjects
  { name: 'manage_subjects', description: 'Eliminar materias/Id' }, // subjects
  { name: 'delete_subjects', description: 'Eliminar materias/Id' }, // subjects

  { name: 'manage_teachers', description: 'Gestionar docentes' }, // teachers
  { name: 'view_teachers', description: 'Ver docentes' }, // teachers
  { name: 'manage_teachers', description: 'Editar docentes/Id' }, // teachers
  { name: 'delete_teachers', description: 'Eliminar docentes/Id' }, // teachers

  { name: 'manage_roles', description: 'Gestionar roles/Id' }, // roles
  { name: 'view_roles', description: 'Ver roles/roles/available' }, // roles
  { name: 'view_users', description: 'Ver usuarios' }, // users
];


  await prisma.permission.createMany({
    data: permissionsData,
    skipDuplicates: true,
  });

  console.log('Permisos creados exitosamente');

  const rolesData = [
  {
    name: 'USER',
    permissions: [
      'view_profile',
      'edit_profile',
    ],
  },
  {
    name: 'STUDENT',
    permissions: [
      'view_profile',
      'edit_profile',
      'view_courses',
      'view_grades',
      'view_assignments',
      'view_enrollments',
      'view_registrations',
      'view_careers',
    ],
  },
  {
    name: 'TEACHER',
    permissions: [
      'view_profile',
      'edit_profile',
      'view_courses',
      'create_courses',
      'edit_courses',
      'delete_courses',
      'view_students',
      'view_assignments',
      'manage_assignments',
      'delete_assignments',
      'edit_grades',
      'assign_grades',
      'view_grades',
      'view_course_records',
    ],
  },
  {
      name: 'ADMIN',
      permissions: permissionsData.map(p => p.name), 
    },
];


  for (const role of rolesData) {
    const createdRole = await prisma.role.create({
      data: {
        name: role.name,
      },
    });

    for (const permissionName of role.permissions) {
      try {
        await prisma.rolePermission.create({
          data: {
            role: { connect: { id: createdRole.id } },
            permission: { connect: { name: permissionName } },
          },
        });
      } catch (error) {
        console.error(`Error conectando permiso ${permissionName} a rol ${role.name}:`, error);
      }
    }
  }

  console.log('Roles creados exitosamente');

  const adminRole = await prisma.role.findUnique({
    where: { name: 'ADMIN' }
  });

  if (!adminRole) {
    throw new Error('Rol ADMIN no encontrado');
  }

  await prisma.user.create({
    data: {
      email: 'yop@admin.com',
      password: await bcrypt.hash('yop123', 10),
      roleId: adminRole.id
    }
  });

  console.log('Usuario admin creado exitosamente');
}

main()
  .catch(e => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });