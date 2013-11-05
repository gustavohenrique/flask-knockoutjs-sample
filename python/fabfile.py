from fabric.api import *

env.user = 'ubuntu'
env.hosts = ['ravoni.com']
env.key_filename = '/home/gustavo/home.pem'

def pack():
    # create a new source distribution as tarball
    local('python setup.py sdist', capture=False)

def remotedeploy():
    pack()
    # figure out the release name and version
    dist = local('python setup.py --fullname', capture=True).strip()
    put('dist/%s.tar.gz' % dist, '/tmp/poupaniquel.tar.gz')
    with cd('/home/ubuntu/www'):
        run('rm -rf poupaniquel')
        run('tar xzf /tmp/poupaniquel.tar.gz')
        run('mv %s poupaniquel' % dist)
        run('virtualenv --no-site-packages /home/ubuntu/www/poupaniquel-env')
    with prefix('. /home/ubuntu/www/poupaniquel-env/bin/activate'):
        run('pip install -r /home/ubuntu/www/poupaniquel/requirements.txt')
    # now that all is set up, delete the folder again
    run('rm -f /tmp/poupaniquel.tar.gz')

def localdeploy():
    pack()
    # copy virtualenv from workspace
    local('rm -rf /home/ubuntu/www/poupaniquel-env')
    local('cp -r .env /home/ubuntu/www/poupaniquel-env')

    dist = local('python setup.py --fullname', capture=True).strip()
    local('cp dist/%s.tar.gz /tmp/poupaniquel.tar.gz' % dist)
    with lcd('/home/ubuntu/www'):
        local('rm -rf poupaniquel')
        local('tar xzf /tmp/poupaniquel.tar.gz')
        local('mv %s poupaniquel' % dist)
        # replace url /api/v1 to /poupaniquel/api/v1
        local("sed -i 's/\/api/\/poupaniquel\/api/g' poupaniquel/webclient/templates/base.html")
    local('rm -f /tmp/poupaniquel.tar.gz')
