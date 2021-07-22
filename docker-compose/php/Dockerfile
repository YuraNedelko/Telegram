FROM php:7.4-fpm

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

RUN curl --silent --location https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y \
  nodejs

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y wget git unzip \
    && pecl install xdebug-3.0.4 \
    && docker-php-ext-enable xdebug

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

ADD php.ini /usr/local/etc/php/php.ini

# Set working directory
WORKDIR /var/www

COPY ../.. /var/www

RUN npm run dev

USER $user

EXPOSE 9000

CMD ["php-fpm"]






