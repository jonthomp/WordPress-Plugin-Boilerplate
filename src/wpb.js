const wpb = require("commander");
const { join } = require("path");
const { exec, cd, exit } = require("shelljs");
const { version } = require("../package");
const fs = require("fs-extra");
const { question, questionPath } = require("readline-sync");
const chalk = require("chalk");
const Renamer = require("renamer");
const renamer = new Renamer();
const log = console.log;

const processInput = (value, questionValue, options, typeFunc = question) => {
  if (!value) {
    value = typeFunc(
      `${questionValue} ${chalk.grey(`(${options.defaultInput})`)} `,
      options
    );
  }
  return value;
};

const execContinueOnError = (command, successMessage, errorMessage) => {
  if (exec(command).code !== 0) {
    log(
      chalk.red(`${errorMessage}
    `)
    );
  } else {
    log(chalk.blue(`${successMessage}...`));
  }
};

const create = input => {
  log(
    chalk.blue(`
  ----------------------------------
  Wordpress React Plugin Boilerplate
  ----------------------------------
  `)
  );

  const name = processInput(input.pluginName, "What is the plugins name?", {
    defaultInput: "wp-plugin-name"
  });

  const path = processInput(
    input.path,
    `Where should the files be copied to?`,
    {
      defaultInput: join(__dirname, "..", name),
      exists: false,
      create: true
    },
    question
  );

  const domain = processInput(input.domain, "What is the plugins domain?", {
    defaultInput: "example.com"
  });
  const uri = processInput(input.uri, "What is the plugins website URI? ", {
    defaultInput: `example.com\/wp-plugin-name-uri`
  });
  const namespace = processInput(
    input.namespace,
    "What should the plugins namespace be?",
    { defaultInput: "WP_Plugin_Name" }
  );
  const author = processInput(input.author, "Who is the plugin author?", {
    defaultInput: "Your Name or Your Company"
  });

  log(
    chalk.blue(`
Creating plugin...`)
  );

  fs.ensureDirSync(path);
  try {
    fs.copySync(join(__dirname, "..", "wp-plugin-name"), path);
    log(chalk.blue(`Files copied....`));
  } catch (err) {
    log(chalk.red(err.message));
    exit(1);
  }
  cd(path);

  execContinueOnError(
    `grep -rl "example.com/wp-plugin-name-uri" ./* | xargs sed -i "s@example.com/wp-plugin-name-uri@${uri}@g"`,
    `URI renamed`,
    `Error while trying to rename all mentions of "example.com/wp-plugin-name-uri" to "${uri}".
See the docs for how to do it manually.`
  );

  execContinueOnError(
    `grep -rl "example.com" ./* | xargs sed -i "s/example.com/${domain}/g"`,
    `Domain renamed`,
    `Error while trying to rename all mentions of "example.com" to "${domain}".
See the docs for how to do it manually.`
  );

  execContinueOnError(
    `grep -rl "wp-plugin-name" ./* | xargs sed -i "s/wp-plugin-name/${name}/g"`,
    `Name renamed`,
    `Error while trying to rename all mentions of "wp-plugin-name" to "${name}".
See the docs for how to do it manually.`
  );

  const nameUnderscored = name.replace("-", "_");

  execContinueOnError(
    `grep -rl "wp_plugin_name" ./* | xargs sed -i "s/wp_plugin_name/${nameUnderscored}/g"`,
    `Underscored name renamed`,
    `Error while trying to rename all mentions of "wp_plugin_name" to "${nameUnderscored}".
See the docs for how to do it manually.`
  );

  execContinueOnError(
    `grep -rl "WP_Plugin_Name" ./* | xargs sed -i "s/WP_Plugin_Name/${namespace}/g"`,
    `Namespace renamed`,
    `Error while trying to rename all mentions of "WP_Plugin_Name" to "${namespace}".
See the docs for how to do it manually.`
  );

  execContinueOnError(
    `grep -rl "Your Name or Your Company" ./* | xargs sed -i "s/Your Name or Your Company/${author}/g"`,
    `Author renamed`,
    `Error while trying to rename all mentions of "Your Name or Your Company" to "${author}".
See the docs for how to do it manually.`
  );

  renamer.on("replace-result", replaceResult => {
    // log(replaceResult);
  });
  renamer.rename({
    files: [`${path}/**/*`],
    find: "wp-plugin-name",
    replace: name
  });
  log(chalk.blue(`Files renamed...`));
  log(chalk.blue(`Installing JS packages...`));

  execContinueOnError(
    `${join(__dirname, "..")}scripts/yarnOrNpmInstall`,
    chalk.green(`Done!`),
    `Failed to install packages, to do this manually run cd ${path} && npm install`
  );

  log(
    chalk.bold.green(`
Finished!
`)
  );

  exit(0);
};

wpb.version(version);

wpb
  .command("create")
  .description("Create a new plugin")
  .option(
    "-p, --path, [path]",
    "The path to where the the new plugin should be created"
  )
  .option("-u, --uri, [uri]", "The uri to the plugins website")
  .option("-d, --domain, [domain]", "The plugins domain")
  .option("-p, --pluginName, [pluginName]", "The plugin name (wp-plugin-name)")
  .option(
    "-s, --namespace, [namespace]",
    "The plugin namespace (WP_Plugin_Name)"
  )
  .option(
    "-a, --author, [author]",
    "The path to where the the new plugin should be created"
  )
  .action(create);

wpb.command("*").action(() => wpb.help());

wpb.parse(process.argv);

if (!process.argv.slice(2).length) {
  wpb.help();
}

// grep -rl "example.com/wp-plugin-name-uri" ./* | xargs sed -i "s/example.com\/wp-plugin-name-uri/somedomain.com\/my-awesome-plugin-uri/g"
