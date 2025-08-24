// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Ignorar archivos generados o irrelevantes
    ignores: [
      'eslint.config.mjs',
      'dist/',
      'node_modules/',
      'coverage/',
      '**/*.spec.ts', // Ignorar archivos de prueba si usas Jest
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // Soporte para Jest (si usas pruebas)
      },
      sourceType: 'commonjs', // Cambia a 'module' si usas ES Modules
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Desactivar reglas problemáticas
      '@typescript-eslint/no-explicit-any': 'off', // Permitir uso de `any`
      '@typescript-eslint/no-floating-promises': 'off', // Permitir promesas no manejadas
      '@typescript-eslint/no-unsafe-argument': 'off', // Desactivar para argumentos inseguros
      '@typescript-eslint/no-unsafe-call': 'off', // Desactivar para llamadas inseguras (decoradores de class-validator)
      '@typescript-eslint/no-unsafe-assignment': 'off', // Desactivar para asignaciones inseguras
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // Cambiar a advertencia y permitir variables con prefijo '_'

      // Otras reglas recomendadas para NestJS
      '@typescript-eslint/explicit-module-boundary-types': 'off', // No forzar tipos en métodos públicos
      '@typescript-eslint/no-unsafe-member-access': 'off', // Desactivar para acceso a miembros inseguros
      'prettier/prettier': 'error', // Asegurar que Prettier se aplique como error
    },
  },
  {
    // Configuración específica para archivos de prueba (si usas Jest)
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off', // Más relajado en pruebas
      '@typescript-eslint/no-explicit-any': 'off', // Permitir `any` en pruebas
    },
  }
);
