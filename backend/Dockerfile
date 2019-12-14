FROM haxe:4.0

RUN apt-get update \
    && apt-get install \
            --yes \
            --no-install-recommends \
            --no-install-suggests \
        php7.3 \
        php7.3-mbstring  \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY *.hxml /usr/src/app/
RUN yes | haxelib install all

# Compile The Project
COPY . /usr/src/app/
RUN haxe build.hxml

# Serve Backend
CMD ["php", "-S", "0.0.0.0:8080", "-t", "www", "www/index.php"]
