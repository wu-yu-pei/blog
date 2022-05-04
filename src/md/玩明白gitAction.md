#### git-action

> 今天终于玩明白了 git-action. 几个月之前了解到了 git-action,自己也尝试了一波,可是没人带,看的也是似懂非懂,我很是郁闷,今天,由于真的太需要这个需求了,就又尝试了一下,突然豁然开朗.一切都明白了. ~!\_!~

下面时我写的一个 workflows

```yml
name: WORK

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  push:
    branches: [master]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  cp:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    name: cp
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3

      # Runs a single command using the runners shell
      - name: goto src
        run: |
          cd src
          ls
          npm install
          npm run cp
      # Deploy
      - name: Deploy
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.ACCESS_TOKEN }}
          # #ARGS: "-avz --delete"
          SOURCE: '/'
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          TARGET: ${{ secrets.REMOTE_PATH }}
```
虽然内容很短,但是我学会了,嘿嘿.