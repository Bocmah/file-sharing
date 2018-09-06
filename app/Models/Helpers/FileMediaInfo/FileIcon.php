<?php

namespace App\Models\Helpers\FileMediaInfo;

class FileIcon
{
    protected $supportedFileExtensions;

    public function __construct()
    {
        $this->supportedFileExtensions = json_decode(
            file_get_contents(base_path("node_modules/file-icon-vectors/dist/icons/vivid/catalog.json"))
        );
    }

    public function hasRelatedIcon(string $fileExtension): bool
    {
        return in_array($fileExtension,$this->supportedFileExtensions) ? true : false;
    }
}