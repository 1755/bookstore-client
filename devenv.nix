{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  dotenv.enable = true;

  # https://devenv.sh/packages/
  packages = [ 
    pkgs.git
    pkgs.docker
    pkgs.httpie
   ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    npm.enable = true;
    npm.install.enable = true;
  };
  languages.typescript = {
    enable = true;
  };

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";

  # https://devenv.sh/services/
  services = {};

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';

  enterShell = ''
    unset PYTHONPATH;
    git --version
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  git-hooks.hooks = {
    eslint.enable = true;
  };

  # See full reference at https://devenv.sh/reference/options/
}
