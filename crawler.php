<?php
/**
 * Data Crawler
 * This script will be "straight forward" with no classes at all.
 *
 * @author Tekin Birdüzen aka x5c0d3 aka Natsu DragonKnee <x5c0d3@gmail.com>
 * @version 1.4.1
 * @since Sep. 2020
 * @licence GNU GPL v3.0
 *
 * Copyright (C) 2020  Tekin Birdüzen
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
 const DATADIR = __DIR__.'/data/';

// Two functions we need
 function jsonLoad ($filename) {
    $file = DATADIR.$filename.'.json';
    if (!file_exists($file) {
        return {};
    }
    $content = file_get_contents($file);
    return json_decode(content);
 }

 function jsonSave($filename, $data) {
    $file = DATADIR.$filename.'.json';
    file_put_contents($file, json_encode($data));
 }

// Get all the places to look
$picSearches = jsonLoad('picturePathes');

// Now let's start crawling
$baseUrl = $picSearches['baseUrl'];

foreach ($picSearches['places'] AS $name => $placeData) {
    if (isset($picSearches['new'][$name]) {
        $placeData['last'] = $picSearches['new'][$name]['last'];
        unset $picSearches['new'][$name]['last'];
    }
}