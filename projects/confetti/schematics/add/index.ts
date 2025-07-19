import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  apply,
  url,
  move,
  template,
  mergeWith
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

function addStyleToAngularJson(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const angularJsonPath = '/angular.json';
    const buffer = tree.read(angularJsonPath);
    if (!buffer) return tree;

    const angularJson = JSON.parse(buffer.toString());
    const projectName = angularJson.defaultProject;
    const styles = angularJson.projects[projectName].architect.build.options.styles;

    const stylePath = 'src/styles/confettti.scss';

    if (!styles.includes(stylePath)) {
      styles.unshift(stylePath);
    }

    tree.overwrite(angularJsonPath, JSON.stringify(angularJson, null, 2));
    return tree;
  };
}

export function ngAdd(): Rule {
  return chain([
    mergeWith(
      apply(url('../files'), [
        template({ ...strings }),
        move('src/styles'),
      ])
    ),
    addStyleToAngularJson()
  ]);
}
