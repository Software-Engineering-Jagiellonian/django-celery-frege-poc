import pytest

from fregepoc.analyzers.core import AnalyzerFactory
from fregepoc.analyzers.tests.rust.constants import MOCKED_RUST_FILES
from fregepoc.repositories.constants import ProgrammingLanguages
from fregepoc.repositories.factories import RepositoryFileFactory


@pytest.mark.django_db
class TestRustAnalyzerEmpty:
    def test_count_loc(self, settings, dummy_repo):
        settings.DOWNLOAD_PATH = MOCKED_RUST_FILES
        analyzers = AnalyzerFactory.make_analyzers(ProgrammingLanguages.RUST)
        repo_file = RepositoryFileFactory(
            repository=dummy_repo,
            language=ProgrammingLanguages.RUST,
            **{"repo_relative_file_path": "empty.rs"},
        )
        for analyzer in analyzers:
            actual = analyzer.analyze(repo_file)
            assert actual["lines_of_code"] == 0
            assert actual["token_count"] == 0
            assert actual["average_lines_of_code"] == 0
            assert actual["average_token_count"] == 0
            assert actual["average_cyclomatic_complexity"] == 0
            assert actual["average_parameter_count"] == 0
